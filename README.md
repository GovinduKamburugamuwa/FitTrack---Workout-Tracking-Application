# FitTrack - Workout Tracking Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking your workouts and fitness progress.

## Features

- Create, read, update, and delete workout entries
- Track workout details including exercise name, weight, and repetitions
- Responsive and intuitive user interface with modern design
- Real-time updates when adding or modifying workouts
- Chronological display of workout history

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- RESTful API architecture

### Frontend
- React.js
- Modern React Hooks (useState, useEffect)
- React Icons for UI elements

## Project Structure

### Backend
- `models/workoutModels.js` - MongoDB schema for workout data
- `controllers/workoutController.js` - API route handlers for CRUD operations

### Frontend
- `components/WorkoutDetails.js` - Component to display individual workout entries
- `components/WorkoutForm.js` - Form component to add new workouts

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/workoutes | Retrieve all workouts |
| GET | /api/workoutes/:id | Retrieve a specific workout |
| POST | /api/workoutes | Create a new workout |
| DELETE | /api/workoutes/:id | Delete a specific workout |
| PATCH | /api/workoutes/:id | Update a specific workout |

## Setup Instructions

### Prerequisites
- Node.js (v14.x or later)
- MongoDB (local installation or Atlas account)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fittrack.git
   cd fittrack
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

6. Start the frontend development server (in a new terminal):
   ```
   cd frontend
   npm start
   ```

7. Access the application at `http://localhost:3000`

## Usage

1. Add a new workout by filling out the form with the exercise name, weight, and repetitions
2. View your workout history displayed in chronological order
3. Edit or delete existing workouts using the action buttons

## Future Enhancements

- User authentication system
- Workout categories and filtering
- Progress tracking and statistics
- Mobile application using React Native

## Known Issues

- The edit functionality is currently being implemented
- Form validation could be improved with more specific error messages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
