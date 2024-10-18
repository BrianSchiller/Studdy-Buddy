# Studdy Buddy - Language Learning Website

Welcome to the Studdy Buddy project! This is a language learning application built with React (frontend) and Django (backend). This README will guide you through the process of setting up the project locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or later)
- **npm** (Node package manager, comes with Node.js)
- **Python** (version 3.6 or later)
- **Django** (version 3.0 or later)
- **pip** (Python package manager, comes with Python)

### Install Node.js and npm
You can download and install Node.js from [nodejs.org](https://nodejs.org/).

### Install Python and pip
You can download Python from [python.org](https://www.python.org/). Pip is included with Python installations.

### Install Django
You can install Django globally using pip:
```bash
pip install django
```

### Install Django REST Framework
You'll also need the Django REST framework for the backend API:
```bash
pip install djangorestframework
```

## Frontend Setup
1. Clone the Repository Clone the project repository using Git:

```bash
git clone https://github.com/yourusername/studdy-buddy.git
cd studdy-buddy/frontend
```

2. Install Dependencies Install the necessary dependencies for the frontend using npm:
```bash
npm install
```

3. Start the Frontend Development Server You can run the React application using:
```bash
npm start
```
This will open the application in your default web browser at http://localhost:3000.

## Backend Setup
1. Navigate to the Backend Directory In a new terminal window, navigate to the backend directory:

```bash
cd studdy-buddy/backend
```

2. Create a Virtual Environment:

```bash
python -m venv venv
```

3. Activate Virtual Environment

On Windows:
```bash
venv\Scripts\activate
```

4. Install Dependencies Install the required packages for the backend:

```bash
pip install -r requirements.txt
```

5. Apply Database Migrations Run the following command to create the necessary database tables:

```bash
python manage.py migrate
```

6. Start the Backend Development Server:

```bash
python manage.py runserver
```
This will start the server at http://localhost:8000.

## Additional
Please do not push untested/unfinished code to the main branch
Create a new branch on which you work with your unfinished code and only merge if you're certain it won't break the platform

Also, please do not push the database (db.sqlite3 file) to any branch. I only included it in the inital commit to provide you with accounts so you don't have to create them yourselves.


