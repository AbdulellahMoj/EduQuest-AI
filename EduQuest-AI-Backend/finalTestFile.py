## this file is used to test the functionality of the final code.

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

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

uri = "mongodb+srv://eduquestai:H6qbXm8yoaURGNaz@eduquestai.ysrdrgh.mongodb.net/?retryWrites=true&w=majority&appName=EduQuestAI"
client = MongoClient(uri)
databases = [client['Courses'], client['Users']]
courses_collection = databases[0].get_collection("courses")
users_collection = databases[1].get_collection("users_data")

# OpenAI API
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# Utility functions

def create_user_json(username, name, password, json_filename='username.json'):
    existing_user = users_collection["users"].find_one({"username": username})
    if existing_user:
        return {"status": "error", "message": "Username already registered"}
    
    new_user = {
        "username": username,
        "name": name,
        "password": password,
        "my_courses": [],
        "exp": 0
    }
    user_id = users_collection.insert_one(new_user).inserted_id
    print(f"User {username} has been successfully added to the database with ID: {user_id}")
    return {"status": "success", "message": "User successfully added", "user_id": str(user_id), "username": username}

def generate_random_id(length=6):
    while True:
        characters = string.ascii_uppercase + string.digits
        random_string = ''.join(random.choices(characters, k=length))
        if courses_collection.find_one({"course_id": random_string}) == None:
            break
    return random_string

def extract_text_from_pdf(pdf_path):
    try:
        pdf_document = fitz.open(pdf_path)
        text = ""
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        return text
    except Exception as e:
        logging.error(f"Error extracting text from PDF: {e}")
        return ""

def generate_questions_from_text(my_prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": my_prompt}
            ],
            max_tokens=2500,
            temperature=0.3
        )
        logging.info("Generated response from OpenAI API")
        
        response_content = response.choices[0].message['content']
        logging.info(f"Response content: {response_content}")
        
        try:
            response_data = json.loads(response_content)
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {e}")
            return {"status": "error", "message": "Failed to decode response as JSON"}
        
        course_id = generate_random_id()
        course_data = {"course_id": course_id}
        course_data.update(response_data)
        courses_collection.insert_one(course_data)
        
        return response_content
    except Exception as e:
        logging.error(f"Error generating questions from text: {e}")
        return {"status": "error", "message": "An error occurred during question generation"}

def save_json_to_file(data, filename):
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        logging.info(f"JSON data successfully saved to {filename}")
    except Exception as e:
        logging.error(f"Error saving JSON to file: {e}")

# Main execution
file = "EduQuest-AI-Backend\ch-10.pdf"

content = extract_text_from_pdf(file)
print(content)

if content:
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

    questions = generate_questions_from_text(prompt)
    print(questions)
    
    # Save the generated questions to a JSON file
    if isinstance(questions, str):
        try:
            questions_data = json.loads(questions)
            save_json_to_file(questions_data, "generated_questions"+"2"+".json")
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error while saving: {e}")
else:
    logging.error("Failed to extract text from PDF")



# create users json
Abdul = create_user_json("AbdulellahMoj", "abdulellah", "1d93dj")
create_user_json("ahmedGR", "ahmed", "q1w2e3")
print(Abdul)
if isinstance(Abdul, str):

    try:    
            user_data = json.loads(Abdul)
            save_json_to_file(user_data, "user_data"+"1"+".json")
    except json.JSONDecodeError as e:
            logging.error(f"JSON decode error while saving: {e}")

ahmed = create_user_json("ahmedGR", "ahmed", "q1w2e3")
print(ahmed)
if isinstance(ahmed, str):
    try:
            user_data = json.loads(ahmed)
            save_json_to_file(user_data, "user_data"+"2"+".json") 
    except json.JSONDecodeError as e:
            logging.error(f"JSON decode error while saving: {e}")
            