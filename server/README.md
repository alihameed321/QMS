# QMS Server (Quality Management System)

A Django-based backend server for managing educational institution data, including departments, courses, students, and attendance tracking.

## Overview

This Django server provides a RESTful API for the QMS (Quality Management System) application. It handles user authentication, student management, course management, and attendance tracking with a robust data model and secure API endpoints.

## Features

- **User Management**
  - JWT-based authentication
  - User profiles with extended information
  - Role-based access control (Admin, Responsible, Students)

- **Department & Course Management**
  - Department CRUD operations
  - Course management within departments
  - Class scheduling and responsible assignment

- **Student Management**
  - Complete student profile management
  - Course enrollment system
  - Student-class mapping

- **Attendance System**
  - Track student attendance (Present, Tardy, Absent)
  - Student availability tracking
  - Attendance reporting capabilities

## Tech Stack

- Django 5.1.4
- Django REST Framework
- JWT Authentication (Simple JWT)
- SQLite Database
- CORS support for frontend integration

## Project Structure

```
server/
├── QAPI/                   # Main API application
│   ├── models.py          # Data models
│   ├── views.py           # API views and logic
│   ├── serializers.py     # Model serializers
│   ├── urls.py            # API routing
│   └── admin.py           # Admin interface config
├── QMS/                    # Project configuration
│   ├── settings.py        # Project settings
│   └── urls.py            # Main URL routing
├── images/                 # Media storage
├── .venv/                 # Virtual environment
├── manage.py              # Django management script
└── db.sqlite3             # SQLite database
```

## API Endpoints

- `/api/token/` - JWT token generation
- `/departments/` - Department management
- `/profiles/` - User profile management
- `/courses/` - Course management
- `/students/` - Student management
- `/classes/` - Class management
- `/classstudents/` - Student-class mapping
- `/attendances/` - Attendance management
- `/availabilities/` - Student availability management

## Data Models

- **Department**: Academic department information
- **UserProfile**: Extended user information for responsible/staff
- **Course**: Course details linked to departments
- **Student**: Student information and enrollment
- **Class**: Class instances with assigned responsible
- **ClassStudent**: Student-class relationship mapping
- **Attendance**: Student attendance records
- **Availability**: Student availability schedule

## Setup Instructions

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

2. Activate the virtual environment:
   ```bash
   # Windows
   .venv\Scripts\activate
   # Unix/MacOS
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

## Security Features

- JWT-based authentication
- Token blacklisting for secure logout
- CORS configuration for frontend security
- Django's built-in security features
- User type-based access control

## Development Guidelines

1. Always run tests before pushing changes
2. Follow PEP 8 style guidelines
3. Document new API endpoints
4. Update migrations for model changes
5. Keep the virtual environment up to date

## API Usage Examples

### Authentication
```python
# Get JWT token
POST /api/token/
{
    "username": "user@example.com",
    "password": "password123"
}
```

### Create Department
```python
POST /departments/
{
    "name": "Computer Science",
    "description": "Department of Computer Science"
}
```

### Add Student
```python
POST /students/
{
    "first_name": "John",
    "last_name": "Doe",
    "student_code": "CS2024001",
    "course": 1
}
```

## Contributing

1. Create a new branch for each feature
2. Write tests for new functionality
3. Update documentation as needed
4. Submit pull requests for review

## License

This project is proprietary and confidential.
