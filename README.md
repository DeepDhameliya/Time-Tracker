# Survey Application

This is a time tracker application built using HTML, CSS, and JavaScript for the frontend, Node.js for the backend, and PostgreSQL as the database. The application allows users to register, log in, and track their work hours, while the admin can monitor and view user timings.

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
    https://github.com/DeepDhameliya/Time-Tracker.git
    cd Time-Tracker
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
          user_id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255),
          mobile_number VARCHAR(15),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          token_no VARCHAR(255),
          token_timestamp TIMESTAMP
      );

      -- Survey Questions Table
      CREATE TABLE timing (
          timing_id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
          currenttime VARCHAR(255) NOT NULL,
          breaktime VARCHAR(255) NOT NULL,
          date DATE NOT NULL
      );
      ```

6. **Start the application:**

    ```bash
    nodemon main.js
    ```

7. **Access the application:**

    - Visit `http://localhost:3000` in your browser to use the application.
