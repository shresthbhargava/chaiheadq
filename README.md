# ChaiHeadQ - A Twitter Clone

This is a Twitter-like web application built with Django. Users can register, log in, create, edit, and delete their own tweets, including optional photo and video uploads.

## Features
- User Registration and Authentication
- Create, Edit, and Delete Tweets
- Image and Video Uploads
- Tweet Feed ordered by most recent

## Setup and Installation

1.  Clone the repository:
    `git clone https://github.com/shresthbhargava/chaiheadq.git`
2.  Navigate into the project directory:
    `cd chaiheadq`
3.  Create and activate a virtual environment:
    ```bash
    python -m venv .venv
    # On Windows
    .venv\Scripts\activate
    # On macOS/Linux
    source .venv/bin/activate
    ```
4.  Install dependencies:
    `pip install -r requirements.txt`
5.  Set up your environment variables by creating a `.env` file (see `.env.example`).
6.  Run database migrations:
    `python manage.py migrate`
7.  Start the development server:
    `python manage.py runserver`