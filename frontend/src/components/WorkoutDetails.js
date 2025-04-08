// components/WorkoutDetails.js (update to include auth)
import { FaTrash, FaEdit, FaDumbbell, FaFire } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout, onWorkoutDeleted }) => {
  const formattedDate = new Date(workout.createdAt).toLocaleDateString();
  const { user } = useAuthContext();
  
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    
    try {
      const response = await fetch(`/api/workoutes/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      const json = await response.json();
      
      if (response.ok) {
        console.log('Workout deleted', json);
        // Notify parent component that workout was deleted
        if (onWorkoutDeleted) {
          onWorkoutDeleted(workout._id);
        }
      } else {
        console.error('Error deleting workout', json.error);
      }
    } catch (err) {
      console.error('Failed to delete workout', err);
    }
  };
  
  return (
    <div className="workout-card">
      <div className="workout-header">
        <h3>{workout.title}</h3>
        <div className="workout-actions">
          <button className="icon-button edit"><FaEdit /></button>
          <button
            className="icon-button delete"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="workout-stats">
        <div className="stat">
          <FaDumbbell className="stat-icon" />
          <div>
            <p className="stat-value">{workout.loads} kg</p>
            <p className="stat-label">Load</p>
          </div>
        </div>
        
        <div className="stat">
          <FaFire className="stat-icon" />
          <div>
            <p className="stat-value">{workout.rep}</p>
            <p className="stat-label">Reps</p>
          </div>
        </div>
      </div>
      
      <div className="workout-footer">
        <p className="workout-date">{formattedDate}</p>
      </div>
    </div>
  );
}

export default WorkoutDetails;