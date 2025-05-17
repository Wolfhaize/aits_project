# AITS PROJECT

## Group C Members

| Name                  | Registration Number |
|-----------------------|---------------------|
| [Kato Adrian Mugerwa](https://github.com/Wolfhaize)   | 24/U/25909/PS       |
| [Tino Zoe Ramona](https://github.com/Zoe691)       | 24/U/11508/PS       |
| [Akankunda Rita](https://github.com/RitaAkankunda)        | 24/U/03072/PS       |
| [Nakawunde Cana](https://github.com/khana-kaye)        | 24/U/08407/PS       |
| [Ayesiga Calvin Rodney](https://github.com/creeper-byte) | 24/U/04101/PS       |
| [Nabasirye Nicole](https://github.com/NicoleMariah186)      | 23/U/0946       |

frontendurl = "https://aits-group-c.netlify.app/"
backendurl = "https://rita004.pythonanywhere.com/admin"


 # AITS Project
** Overview
The Academic Issue Tracking System (AITS) is a comprehensive web-based platform developed to efficiently manage academic record-related issues.
This system allows students to log concerns such as missing marks, appeals, and corrections, while providing administrators and lecturers with tools to track, assign, and resolve these issues in a transparent manner.

** Features
Student: Log issues, view status, receive notifications.

Lecturer: View assigned issues, update resolutions.

Academic Registrar: Manage and assign issues, resolve directly.

**Core Functionality**
Issue submission with categorization (missing marks, appeals, corrections)
Role-based dashboards with personalized views
Issue assignment and tracking workflow
Real-time status updates and notifications

**Technical Stack**
**Backend**
Framework: Django
API: Django REST Framework
Database: PostgreSQL

**Frontend**
Framework: React
State Management: Redux
Notifications: React Toastify

## Step 1: Pull the Latest Changes

1. **Navigate to the Project Directory**:

   ```bash
   cd aits_project
   ```

2. ## Install Dependencies

1. **Backend Dependencies**:
   - Create a Virtual Environment: Create a new virtual environment in the project directory. This step ensures that all dependencies are isolated for the project:

   ```bash
   python -m venv venv
   ```

   - Activate the Virtual Environment:(make sure you're in the backend folder first) 

   On Windows:

   ```bash
   venv\Scripts\activate
   ```

   - Install Dependencies: Once the virtual environment is activated, they will install the required dependencies using the requirements.txt file:

   ```bash
   pip install -r requirements.txt
   ```
   
3. **Frontend Dependencies**:
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```


---

## Step 3: Run the Backend Server

1. **Navigate to the Backend Directory**:

   ```bash
   cd ../backend
   ```

2. **Run the Backend Server**:

   ```bash
   python manage.py runserver
   ```

   - The backend will be available at `http://127.0.0.1:8000/`.

3. **Create a Superuser (If Needed)**:
   - If you don't have a superuser and need one, create one to access the Django admin panel:
     ```bash
     python manage.py createsuperuser
     ```

---

## Step 4: Run the Frontend Server

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../frontend
   ```

2. **Run the Frontend Server**:
   ```bash
   npm run dev
   ```
   - The frontend will be available at `http://localhost:5173/`.

---

## Step 5: View the Frontend

1. **Signup**:

   - Go to `http://localhost:5173/signup` to create a new account.

2. **Login**:

   - Go to `http://localhost:5173/login` to log in to your account.

3. **Create an Issue**:

   - After logging in, you will be redirected to the dashboard where you can create and view issues.

4. **View Your Issues**:
   - Your created issues will be displayed in the dashboard.

---

## Important Notes

1. **Database**:
Create a PostgreSQL database and update settings.py with your credentials

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
   -
Then apply migrations
python manage.py migrate
python manage.py runserver



3. **Frontend**:

   - Use `npm run dev` to start the frontend server.
   - Ensure the backend server is running (`python manage.py runserver`) for the frontend to work properly.

 **User Guide**
**Student Workflow**
1.Log in with student credentials
2.Navigate to "Submit Issue" from the dashboard
3.Complete the issue form with all required details
4.Track issue status on the dashboard
5.Receive notifications when issue status changes

**Academic Registrar Workflow**
1.Log in with administrative credentials
2.View all submitted issues on the dashboard
3.Review issue details and assign to appropriate lecturers
4.He is notified by the lecturer after resolving the issue who later notifies the student that the issue has been resolved
5.Monitor overall system performance and issue resolution rates

**Lecturer Workflow**
1.Log in with lecturer credentials
2.View assigned issues on the dashboard
3.Investigate and address the academic issues
4.Update issue status and provide resolution details
5.Close resolved issues by notifying the registrar

**Development Process**
This project follows Agile methodology with:
Weekly sprints
Regular stand-up meetings
Frequent code reviews

