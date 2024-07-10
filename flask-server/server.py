from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from bson.json_util import dumps
from bson.objectid import ObjectId
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import openai
import random
import string
import json
import math
from enum import Enum

# Setup

# Flask app
app = Flask(__name__)
CORS(app)

# Mongo Cluster
uri = "mongodb+srv://eduquestai:H6qbXm8yoaURGNaz@eduquestai.ysrdrgh.mongodb.net/?retryWrites=true&w=majority&appName=EduQuestAI"
client = MongoClient(uri)
databases = [client['Courses'], client['Users']]
courses_collection = databases[0].get_collection("courses")
users_collection = databases[1].get_collection("users_data")

# OpenAI API
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

#region course

@app.route('/upload-course', methods=['POST'])
def upload_course():
    # file = request.files['file']
    # content = file.read().decode('utf-8')
    
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
                    "questionType": "TRUE/FALSE",
                    "questionText": "QUESTION EXAMPLE",
                    "choices ": [
                    "TRUE",
                    "FALSE"
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
    The course consists of Units, Levels, and questions:
    1- Each unit represents a unit/chapter/section of the course
    2- Each level represents lesson/part of a lesson.
    3- Each question is constructed of a question, an answer, choices (the number of choices can vary depending on the type), hint, explanation, and mascot response.
    
    Keep in mind the following:
    - Each Unit must contain at least 3 levels, and each level must contain at least 6 questions, and at most 10 questions.
    - The number of units is unlimited, but if the file uploaded by a user is a SINGLE unit, you can read it as such, a single unit, it is not required to have multiple units if the file does not have multiple units.
    - A question must not require an extra context such as images or links, the question must be self-sufficient.
    - Avoid questions that require more context, for example: "what is in the fridge? 1:"Apple", 2:"Milk", 3:"Rice", 4:"Cheese". Clearly this question is impossible to answer because it requires seeing the fridge before.
    - I have added 3 types of questions in the format, you can mix and match between them and generate questions in any one of these styles (MCQ, True/False, Fill in the blank with choices).
    - Do not add an Introduction or a conclusion to your message.
    - Do not add any markdown marks to the file.
    Please generate the text using this format based on the following course content:
    """ # + f"{content}"

    # response = openai.chat.completions.create(
    #     model='gpt-3.5-turbo',
    #     messages= { "role": "user", "content":prompt},
    #     max_tokens=16384
    # )

    course_id = generate_random_id()
    course_data = jsonify({"course_id": course_id})

    # FOR TESTING, REMOVE WHEN DEPOLOYED
    with open('Test.json', 'r') as file:
        response_data = json.load(file)
        print("Successfully read the json file")

    # response_data = json.loads(response.choices[0].text.strip())
    course_data.update(response_data)

    courses_collection.insert_one(course_data)
    print(f"Successfully inserted {course_id} course into MongoDB")
        
    return jsonify(course_data)

@app.route('/get-course/<id>', methods=['GET', 'POST'])
def get_course(id):
    return dumps(courses_collection.find_one({"course_id" : id}))

def generate_random_id(length=6):
    while True:
        characters = string.ascii_uppercase + string.digits
        random_string = ''.join(random.choices(characters, k=length))
        if courses_collection.count_documents({"course_id" : random_string}) == 0:
            break

    return random_string

#endregion 

# region xp
@app.route('/get-user-level/<id>', methods=['GET', 'POST'])
def get_user_level(id, k=1, a=2):
    """
    Calculate the user level based on XP using an exponential function.
    
    Parameters:
    id (float or int): The user id.
    k (float, optional): A constant factor to adjust scaling. Default is 1.
    a (float, optional): The exponent factor to adjust the curve. Default is 0.5.
    
    Returns:
    int: The calculated user level as an integer.
    """

    xp = get_xp(id)
    k = 0.6
    a = 0.5
    level = calculate_level(xp, k, a)
    level_progress = calculate_level_progress(xp, k, a)
    return {"level": level, "level_progress":level_progress}

def get_xp(id):
    user_data = users_collection.find_one({'_id': ObjectId(id)})

    if user_data is None:
        return jsonify({'error': 'Object not found'}), 404
    else:
        xp = user_data.get("xp")
        return jsonify({'xp': xp})

def calculate_level(xp, k=0.5, a=0.5):
    level = k * math.pow(xp, a)
    return int(level)

def calculate_level_progress(xp, k=0.5, a=0.5):
    level_progress = (k * math.pow(xp, a)) - math.floor(k * math.pow(xp, a))
    return level_progress
# endregion

# region powerups
class POWERUPS(Enum):
    FREEZETIME = 0
    ADDHEART = 1
    DOUBLEXP = 2

@app.route('/get-powerup', methods=['POST'])
def get_powerup():
    CHANCE = 0.5
    powerup_chance = random.randrange(0,1)
    if(powerup_chance > CHANCE):
        return random.choice(list(POWERUPS))
    else:
        pass

@app.route('/activate-powerup/<value>', methods=['GET', 'POST'])
def activate_powerup(value):
    powerup_type = POWERUPS(value)
    match powerup_type:
        case 0:
            # FREEZE TIME LOGIC
            pass
        case 1:
            # STOP TIME LOGIC
            pass
        case 2:
            # DOUBLE XP LOGIC
            pass
        case 3:
            # MORE TIME LOGIC
            pass
        case 4:
            #FIFTY FIFTY LOGIC
            pass
#endregion

if __name__ == '__main__':
    app.run(debug=True)