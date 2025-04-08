// pages/Home.js (update to include auth)
import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { FaDumbbell } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      
      if (!user) {
        setError('You must be logged in');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('/api/workoutes/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      
      if (response.ok) {
        setWorkouts(json);
      } else {
        setError('Failed to fetch workouts');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  // Handle when a workout is successfully added
  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts(prev => prev ? [newWorkout, ...prev] : [newWorkout]);
  };

  // Handle when a workout is deleted
  const handleWorkoutDeleted = (deletedId) => {
    setWorkouts(prev => prev.filter(workout => workout._id !== deletedId));
  };

  return (
    <div className="dashboard">
      <div className="container dashboard-container">
        <div className="workouts-section">
          <div className="section-header">
            <h2>Your Workouts</h2>
            <span className="workout-count">{workouts ? workouts.length : 0} total</span>
          </div>
          
          {isLoading && (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading your workouts...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button className="retry-button" onClick={fetchWorkouts}>Retry</button>
            </div>
          )}
          
          {workouts && workouts.length === 0 && (
            <div className="empty-state">
              <FaDumbbell className="empty-icon" />
              <p>No workouts yet. Add your first workout!</p>
            </div>
          )}
          
          <div className="workouts-grid">
            {workouts && workouts.map((workout) => (
              <WorkoutDetails 
                key={workout._id} 
                workout={workout} 
                onWorkoutDeleted={handleWorkoutDeleted}
              />
            ))}
          </div>
        </div>
        
        <div className="form-section">
          <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />
        </div>
      </div>
    </div>
  );
};

export default Home;