# Noteify - Notes App

Noteify is a simple and intuitive web application that allows users to create, update, and delete notes. Built using the MERN stack (MongoDB, Express, React, Node.js) and styled with Bootstrap, this app offers a modern interface for note-taking.

## Features

- **User Authentication**: Users can register, log in, and manage their notes securely.
- **Create Notes**: Add new notes with a title, description, and tag.
- **Edit Notes**: Update existing notes to modify their content.
- **Delete Notes**: Remove unwanted notes.
- **Responsive Design**: Built using Bootstrap for a responsive and user-friendly interface.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation Guide

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v14 or higher)
- MongoDB (or MongoDB Atlas for cloud-based storage)
- Git

### Steps to Run the Application Locally

1. **Clone the repository**:
   git clone https://github.com/NiharikaGoel02/Noteify.git

2. **Install backend dependencies**:
   Navigate to the backend folder and install dependencies.
   cd Noteify/backend
   npm install

3. **Configure environment variables**:
   Create a `.env` file in the `backend` directory and add the following variables:
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PORT=5000

4. **Run the backend**:
   npm start
   This will start the backend server on port 5000 (default).

5. **Install frontend dependencies**:
   Now, navigate to the frontend folder and install dependencies.
   cd ../frontend
   npm install

6. **Run the frontend**:
   Start the React development server.
   npm start
   This will start the frontend server on port 3000 (default).

7. **Access the application**:
   Once both the frontend and backend are running, you can access the app by navigating to [http://localhost:3000](http://localhost:3000).

### Testing the Application

Once the application is running:
1. **Sign Up**: Create a new user account.
2. **Log In**: Use your credentials to log in and start managing notes.
3. **Add, Edit, Delete Notes**: Use the app to perform CRUD operations (Create, Read, Update, Delete) on your notes.
