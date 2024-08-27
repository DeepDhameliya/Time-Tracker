# Survey Application

This is a time tracker application built using HTML, CSS, and JavaScript for the frontend, Node.js for the backend, and PostgreSQL as the database. The application allows users to register, log in, and participate in surveys created by an admin.

## Features

### Admin
- User Timing Overview: View the punch-in, punch-out, and break times for all users.

### User
- Punch-In/Out: Start and stop your workday with a single click.
- Break Handling: Take breaks during working hours, with the ability to resume timing.
- Timing Display: View current work and break times on a clear, user-friendly interface.
- Persistent Tracking: Your work and break times are preserved, even if the page is refreshed.

## Installation

### Prerequisites
- Node.js
- PostgreSQL
- XAMPP Server

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/DeepDhameliya/survey-application.git
    cd survey-application
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Install nodemon (if not already installed globally):**

    ```bash
    npm install -g nodemon
    ```

4. **Set up the environment variables:**

    Create a `.env` file in the root directory with the following content (replace the placeholder values with your actual values):

    ```env
    GOOGLE_CLIENT_ID=""         # Your Google Client ID
    GOOGLE_CLIENT_SECRET=""     # Your Google Client Secret
    SESSION_SECRET=""           # A secret key for session management
    PG_USER=""                  # PostgreSQL username
    PG_HOST="localhost"         # PostgreSQL host (default: localhost)
    PG_DATABASE="your_database_name"  # Replace with your PostgreSQL database name
    PG_PASSWORD=""              # PostgreSQL password
    PG_PORT="5432"              # PostgreSQL port (default: 5432)
    ADMIN_EMAIL=""              # Admin email address
    ADMIN_PASS=""               # Admin password
    ADMIN_NAME="Admin User"     # Admin username (default: Admin User)
    ADMIN_TOKEN=""              # Admin token for specific functionalities
    EMAIL_PASSWORD=""           # Email password for sending emails (e.g., SMTP service)
    ```

5. **Set up the PostgreSQL database:**

    - Log in to your PostgreSQL server:

      ```bash
      psql -U postgres
      ```

    - Create the required tables:

      ```sql
      -- Users Table
      CREATE TABLE users (
          userid SERIAL PRIMARY KEY,
          fname VARCHAR(255) NOT NULL,
          mname VARCHAR(255),
          lname VARCHAR(255),
          mobilenumber VARCHAR(15),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          token_no VARCHAR(255),
          token_timestamp TIMESTAMP
      );

      -- Survey Questions Table
      CREATE TABLE survey_questions (
          id SERIAL PRIMARY KEY,
          question TEXT NOT NULL,
          options TEXT NOT NULL,  -- Store options as a comma-separated string
          type VARCHAR(50) NOT NULL
      );

      -- Survey Responses Table
      CREATE TABLE survey_responses (
          response_id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          question_id INT NOT NULL,
          response TEXT NOT NULL,
          UNIQUE (user_id, question_id),  -- Ensure that each user can only respond to each question once
          FOREIGN KEY (user_id) REFERENCES users(userid) ON DELETE CASCADE,
          FOREIGN KEY (question_id) REFERENCES survey_questions(id) ON DELETE CASCADE
      );

      -- Feedback Table
      CREATE TABLE feedback (
          feedback_id SERIAL PRIMARY KEY,
          userid INT NOT NULL UNIQUE,  -- Ensure that each user can have only one feedback entry
          surveyResponse TEXT,
          suggestion TEXT,
          email VARCHAR(255),
          FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
      );
      ```

6. **Start the application:**

    ```bash
    nodemon index.js
    ```

7. **Access the application:**

    - Visit `http://localhost:3000` in your browser to use the application.
