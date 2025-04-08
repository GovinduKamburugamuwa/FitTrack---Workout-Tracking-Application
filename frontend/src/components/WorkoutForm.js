// components/WorkoutForm.js (update to include auth)
import { useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = ({ onWorkoutAdded }) => {
  const [title, setTitle] = useState('');
  const [rep, setRep] = useState('');
  const [loads, setLoads] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in')
      return
    }
    
    setIsLoading(true);
    
    const workout = {
      title,
      rep: Number(rep),
      loads: Number(loads)
    };
    
    try {
      const response = await fetch('/api/workoutes', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      const json = await response.json();
      
      if (!response.ok) {
        setError(json.error);
      }
      
      if (response.ok) {
        setTitle('');
        setLoads('');
        setRep('');
        setError(null);
        console.log('New Workout added', json);
        
        // Notify parent component about the new workout
        if (onWorkoutAdded) {
          onWorkoutAdded(json);
        }
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Add a New Workout</h2>
      
      <form className="workout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Workout Name</label>
          <input
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="e.g. Bench Press"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="loads">Weight (kg)</label>
            <input
              id="loads"
              type="number"
              onChange={(e) => setLoads(e.target.value)}
              value={loads}
              placeholder="e.g. 50"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="reps">Repetitions</label>
            <input
              id="reps"
              type="number"
              onChange={(e) => setRep(e.target.value)}
              value={rep}
              placeholder="e.g. 12"
              required
            />
          </div>
        </div>
        
        <button
          className="submit-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : (
            <>
              <FaPlus className="btn-icon" /> Add Workout
            </>
          )}
        </button>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;