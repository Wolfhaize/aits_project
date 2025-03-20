
# AITS Project

This project is a web application for managing academic issues. It currently supports:
- **User Authentication**: Login and Signup.
- **Issue Management**: Students can create issues and view the issues they've created.



## Step 1: Pull the Latest Changes

1. **Navigate to the Project Directory**:
   ```bash
   cd aits_project
   ```

2. **Pull the Latest Changes**:
   ```bash
   git pull origin main  # Replace 'main' with your branch name if needed
   ```

3. **Resolve Database Conflicts (If Any)**:
   - If you encounter database-related errors (e.g., merge conflicts), delete your `db.sqlite3` file and run migrations:
     ```bash
     cd backend
     python manage.py migrate
     ```

---

## Step 2: Install Dependencies

1. **Backend Dependencies**:
   - install manually if you get a missing package error

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
   - Do **not** push the `db.sqlite3` file to the repository. It causes merge conflicts and is specific to your local environment.
   - If you need to recreate the database, run:
     ```bash
     python manage.py migrate


3. **Frontend**:
   - Use `npm run dev` to start the frontend server.
   - Ensure the backend server is running (`python manage.py runserver`) for the frontend to work properly.

4. **Authentication**:
   - You must sign up or log in to access the different dashboards.

