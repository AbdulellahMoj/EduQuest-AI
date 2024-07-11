from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import openai
import random
import string
from bson.json_util import dumps
import json
import math
from datetime import datetime
from enum import Enum
from rich import print
import fitz
import logging

# Setup

# Flask app
app = Flask(__name__)
CORS(app)

# MongoDB setup
uri = "mongodb+srv://eduquestai:H6qbXm8yoaURGNaz@eduquestai.ysrdrgh.mongodb.net/?retryWrites=true&w=majority&appName=EduQuestAI"
client = MongoClient(uri)
databases = [client['Courses'], client['Users']]
courses_collection = databases[0].get_collection("courses")
users_collection = databases[1].get_collection("users_data")

# OpenAI API setup
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# Utility functions
def save_json_to_file(data, filename):
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        logging.info(f"JSON data successfully saved to {filename}")
    except Exception as e:
        logging.error(f"Error saving JSON to file: {e}")


def create_user_json(username, name, password, json_filename='username.json'):
    # Check if the user already exists
    existing_user = users_collection.find_one({"username": username})
    if existing_user:
        return {"status": "error", "message": "Username already registered"}
    
    # Create new user data
    new_user = {
        "username": username,
        "name": name,
        "password": password,
        "my_courses": [],  # This will be populated later
        "exp": 0
    }
    # Insert the new user into the users collection
    user_id = users_collection.insert_one(new_user).inserted_id

    # Print user info
    print(f"User {username} has been successfully added to the database with ID: {user_id}")
    return {"status": "success", "message": "User successfully added", "user_id": str(user_id), "username": username}

def generate_random_id(length=6):
    while True:
        characters = string.ascii_uppercase + string.digits
        random_string = ''.join(random.choices(characters, k=length))
        if courses_collection.count_documents({"course_id": random_string}) == 0:
            break
    return random_string

def update_course_progress(user_id, course_id, level, progress):
    user = users_collection.find_one({"user_id": user_id})
    if user:
        course = user_progress_collection.find_one({"my_courses": course_id})
        if course:
            user_progress_collection.update_one({"my_courses": course_id}, {"$set": {"level": level, "progress": progress}})
            return {"status": "success", "message": "Course progress successfully updated"}
        else:
            return {"status": "error", "message": "Course not found in user progress"}
    else:
        return {"status": "error", "message": "User not found"}

def find_course(course_id):
    course = courses_collection.find_one({"course_id": course_id})
    if course:
        return course
    else:
        return {"status": "error", "message": "Course not found"}

def get_xp(id):
    user_data = users_collection.find_one({"user_id": id})
    if user_data:
        return user_data.get("xp")
    else:
        raise ValueError(f"user id {id} was not found.")

def calculate_level(xp, k=0.5, a=0.5):
    level = k * math.pow(xp, a)
    return int(level)

def calculate_level_progress(xp, k=0.5, a=0.5):
    level_progress = (k * math.pow(xp, a)) - math.floor(k * math.pow(xp, a))
    return level_progress

# Flask routes

@app.route('/upload-course', methods=['POST'])
def upload_course():
    file = request.files['file']
    content = file.read().decode('utf-8')
    
    prompt = """
    You are an AI that helps in creating educational content. Given a course material, generate a structured and comprehensive json file with in the following formation:
    
    {
        "courseCode": "COURSE CODE EXAMPLE",
        "courseTitle": "COURSE TITLE EXAMPLE",
        "units": {
            "unitId": 1,
            "unitText": "UNIT NAME EXAMPLE",
            "levels":
            {
                "levelId": 1,
                "questions": [
                {
                    "questionId": 1,
                    "questionType": "MCQ",
                    "questionText": "QUESTION EXAMPLE",
                    "choices ": [
                    "CHOICE1",
                    "CHOICE2",
                    "CHOICE3",
                    "CHOICE4"
                    ],
                    "answer": "ANSWER EXAMPLE",
                    "explanation": "EXPLANATION EXAMPLE",
                    "hint": "HINT EXAMPLE",
                    "mascot": "RESPONSE EXAMPLE"
                },
                {
                    "questionId": 1,
                    "questionType": "MCQ",
                    "questionText": "QUESTION EXAMPLE",
                    "choices ": [
                    "CHOICE1",
                    "CHOICE2",
                    "CHOICE3",
                    "CHOICE4"
                    ],
                    "answer": "ANSWER EXAMPLE",
                    "explanation": "EXPLANATION EXAMPLE",
                    "hint": "HINT EXAMPLE",
                    "mascot": "RESPONSE EXAMPLE"
                },
                {
                    "questionId": 1,
                    "questionType": "FILL IN THE BLANK",
                    "questionText": "QUESTION ______ EXAMPLE",
                    "choices ": [
                    "CHOICE1",
                    "CHOICE2",
                    "CHOICE3",
                    "CHOICE4"
                    ],
                    "answer": "ANSWER EXAMPLE",
                    "explanation": "EXPLANATION EXAMPLE",
                    "hint": "HINT EXAMPLE",
                    "mascot": "RESPONSE EXAMPLE"
                }
                (more questions here)
            }
            (more levels here)
        }
        (more units here)
    }

    ---
    - *important* Each Unit must contain at least 5 levels, and each level must contain at least 6 questions, and at most 10 questions.
    - Each question must have at least 4 words and at most 24 words.
    - Each choice must have at least 1 word and at most 7 words.
    -The course consists of Units, Levels, and questions:
    1- Each unit represents a unit/chapter/section of the course
    2- Each level represents lesson/part of a lesson.
    3- Each question is constructed of a question, an answer, choices (the number of choices can vary depending on the type), hint, explanation, and mascot response.
    
    Keep in mind the following:

    - The number of units is unlimited, but if the file uploaded by a user is a SINGLE unit, you can read it as such, a single unit, it is not required to have multiple units if the file does not have multiple units.
    - A question must not require an extra context such as images or links, the question must be self-sufficient.
    - Avoid questions that require more context, for example: "what is in the fridge? 1:"Apple", 2:"Milk", 3:"Rice", 4:"Cheese". Clearly this question is impossible to answer because it requires seeing the fridge before.
    - I have added 3 types of questions in the format, you can mix and match between them and generate questions in any one of these styles (MCQ, True/False, Fill in the blank with choices).
    - Do not add an Introduction or a conclusion to your message.
    - Do not add any markdown marks to the file.
    Please generate the text using this format based on the following course content:
    """ + f"{content}"

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": my_prompt}
            ],
        max_tokens=2500,
        temperature=0.3
    )

    course_id = generate_random_id()
    course_data = {"course_id": course_id}

    response_data = json.loads(response.choices[0].message['content'])
    course_data.update(response_data)

    courses_collection.insert_one(course_data)
    print(f"Successfully inserted {course_id} course into MongoDB")
        
    return jsonify({'message': 'Course uploaded and processed successfully', 'course_id': course_id})

@app.route('/get-course', methods=['POST'])
def get_course(id):
    return dumps(courses_collection.find_one({"course_id": id}))

@app.route('/get-user-level', methods=['POST'])
def get_user_level(id, k=1, a=2):
    xp = get_xp(id)
    level = calculate_level(xp, k, a)
    level_progress = calculate_level_progress(xp, k, a)
    return {"level": level, "level_progress": level_progress}

class POWERUPS(Enum):
    FREEZETIME = 0
    ADDHEART = 1
    DOUBLEXP = 2

@app.route('/get-powerup', methods=['POST'])
def get_powerup():
    CHANCE = 0.5
    powerup_chance = random.random()
    if powerup_chance > CHANCE:
        return jsonify({"powerup": random.choice(list(POWERUPS)).name})
    else:
        return jsonify({"powerup": None})

@app.route('/activate-powerup', methods=['POST'])
def activate_powerup(value):
    powerup_type = POWERUPS(value)
    match powerup_type:
        case POWERUPS.FREEZETIME:
            # FREEZE TIME LOGIC
            pass
        case POWERUPS.ADDHEART:
            # STOP TIME LOGIC
            pass
        case POWERUPS.DOUBLEXP:
            # DOUBLE XP LOGIC
            pass

# Additional routes

@app.route('/add-user', methods=['POST'])
def add_user():
    data = request.json
    username = data['username']
    name = data['name']
    password = data['password']
    result = create_user_json(username, name, password)
    return jsonify(result)

@app.route('/add-course', methods=['POST'])
def add_course_to_user():
    data = request.json
    course_id = data['course_id']
    user_id = data['user_id']
    result = add_course(course_id, user_id)
    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    result = log_in(username, password)
    return jsonify(result)

# Application entry point
if __name__ == '__main__':
    app.run(debug=True)
