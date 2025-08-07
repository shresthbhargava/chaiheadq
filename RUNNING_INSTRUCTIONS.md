# Running the ChaiHeadQ Django Project

This document provides instructions for running the ChaiHeadQ Django project locally on your machine.

## Changes Made

I've made several key improvements to make the project fully functional:

### 1. Fixed requirements.txt
- Fixed encoding issues in the requirements.txt file
- Ensured all dependencies are properly listed:
  - Django 5.2.4
  - asgiref 3.9.1
  - sqlparse 0.5.3
  - tzdata 2025.2
  - pillow 10.4.0
  - python-dotenv 1.0.1

### 2. Cleaned up settings.py
- Removed duplicate BASE_DIR definition
- Removed duplicate SECRET_KEY and DEBUG definitions
- Removed duplicate STATIC_URL and STATICFILES_DIRS definitions
- Improved environment variable handling with fallbacks for development

### 3. Fixed template issues
- Removed duplicate closing tags in registration templates (login.html and register.html)
- Improved layout.html with proper Bootstrap JavaScript dependencies
- Fixed navbar links and structure
- Cleaned up extra whitespace

### 4. Verified URL routing
- Confirmed proper URL configuration in both main project and tweet app
- Ensured all views are correctly mapped

### 5. Verified media file handling
- Confirmed MEDIA_URL and MEDIA_ROOT settings in settings.py
- Verified static file serving configuration in urls.py

### 6. Verified database migrations
- Confirmed migrations match the current Tweet model
- Initial migration creates the Tweet model
- Second migration adds photo and video fields

## Running the Project

Follow these steps to run the project locally:

### 1. Set up the virtual environment
```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run database migrations
```bash
cd chaiheadq
python manage.py migrate
```

### 4. Create a superuser (optional but recommended)
```bash
python manage.py createsuperuser
```

### 5. Run the development server
```bash
python manage.py runserver
```

### 6. Access the application
Open your web browser and go to http://localhost:8000/chaiheadq/

## Project Features

The ChaiHeadQ application includes:

1. User registration and authentication
2. Tweet creation with text, optional photos, and optional videos
3. Tweet listing with user information
4. Tweet editing and deletion (for own tweets)
5. Responsive design using Bootstrap

## URLs

- Home page: http://localhost:8000/chaiheadq/
- Tweet list: http://localhost:8000/chaiheadq/list/
- Create tweet: http://localhost:8000/chaiheadq/create/
- Login: http://localhost:8000/chaiheadq/accounts/login/
- Register: http://localhost:8000/chaiheadq/register/
- Admin: http://localhost:8000/chaiheadq/admin/ (if you created a superuser)

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed: `pip install -r requirements.txt`
2. Ensure migrations are applied: `cd chaiheadq && python manage.py migrate`
3. Check that the virtual environment is activated
4. Verify you're running the command from the correct directory (chaiheadq directory where manage.py is located)

## Additional Notes

- The project uses SQLite as the database, which is suitable for development
- Media files (photos and videos) will be stored in a 'media' directory
- Static files are served correctly in development mode
- The project is configured to run on localhost with DEBUG=True for development