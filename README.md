# Todo App - Fullstack (React + Laravel)

## Project Overview

This is a simple Todo application. It consists of a fullstack application with a **React** frontend and a **Laravel/mySql** backend. The app allows users to manage their todo lists, add/remove tasks, and toggle task completion. 

The application is dockerized, with both the frontend and backend running inside containers, and they are orchestrated using **Docker Compose**.

---

## Features

- User can **create** and **manage** multiple todo lists.
- Add, edit, and delete **todo items**.
- Toggle **completion status** of todo items.
- Option to **discard changes** or **save** changes to todo lists.
- Dockerized setup for easy development and deployment.

---

## Technologies Used

- **Frontend**: React, React Hook Form, Tailwind CSS
- **Backend**: Laravel, mySql
- **Authentication**: Laravel Sanctum
- **Docker**: For containerizing both frontend and backend.
- **Docker Compose**: For managing multi-container Docker applications.

---

## Setup

### Prerequisites

Make sure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Steps to Run the Application Locally

1. **Clone the repository**:

    ```bash
    git clone https://github.com/OwenM-Edwards/todo-list-rth.git
    cd todo-app
    ```

2. **Build and start the Docker containers**:

    ```bash
    docker-compose up --build
    ```

    This will build the frontend and backend images, and start the application. You should now have both the backend and frontend running in separate containers.

3. **Access the application**:

    - **Frontend**: Open `http://localhost:3000` in your browser.

    The app should now be accessible, and you can start interacting with it.

4. **Create an account**:

    You can create a quick account with any fake email (there are no emails sent/email verification etc)

---
