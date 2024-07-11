# EduQuest-AI:

## Project Overview

**EduQuest-AI** is an innovative platform designed to transform the learning journey into an engaging and entertaining experience through gamification techniques. The project comprises a frontend and a backend, each built using state-of-the-art technologies to provide a seamless and interactive user experience.

## Table of Contents

- [Frontend](#frontend)
  - [Technologies Used](#technologies-used)
  - [Key Components](#key-components)
- [Backend](#backend)
  - [Technologies Used](#technologies-used-1)
  - [Key Functions and Endpoints](#key-functions-and-endpoints)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Frontend

### Technologies Used

- **React**
- **TypeScript**
- **Sass**
- **Vite**

### Key Components

- **ChallengerMode.tsx**
- **Home.tsx**
- **Levels.tsx**
- **QuestionsPage.tsx**

## Backend

### Technologies Used

- **Flask**
- **MongoDB**
- **OpenAI API**
- **Python**

### Key Functions and Endpoints

- **User Management**
- **Course Management**
- **Progress Tracking**
- **Power-ups**

## Project Structure

```
EduQuest-AI/
├── EduQuest-Al-Backend/
│   ├── __pycache__/
│   ├── .gitignore
│   ├── eduquest_backend.py
│   ├── finalTestFile.py
│   ├── questions_test_file1.json
│   ├── questions_test_file2.json
│   ├── questions_test_file3.json
├── EduQuest-Al-Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── ChallengerMode.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Levels.tsx
│   │   │   ├── QuestionsPage.tsx
│   │   ├── stylesheets/
│   │   │   ├── App.scss
│   │   ├── App.tsx
│   │   ├── axiosConfig.ts
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
├── La client/
├── Eduquest Mini-Games/
├── Assets/
├── .gitattributes
├── challneger_animation.tscn
├── icon.svg
├── icon.svg.import
├── project.godot
```

## Setup Instructions

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd EduQuest-Al-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd EduQuest-Al-Backend
   ```

2. **Create a virtual environment and activate it**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend**:
   ```bash
   flask run
   ```

## Usage

1. **Access the frontend**: Navigate to `http://localhost:3000` in your browser.
2. **Interact with the platform**: Use the various pages and features to explore courses, levels, and questions.
3. **Upload courses**: Use the backend endpoint `/upload-course` to upload new course content.

## Contributing

We welcome contributions to EduQuest-AI! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
