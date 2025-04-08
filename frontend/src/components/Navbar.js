// components/Navbar.js
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaDumbbell, FaHistory, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <FaDumbbell className="logo-icon" />
          <span>MernStack</span>
        </Link>
        
        <nav>
          {user && (
            <div className="nav-links">
              <Link to="/" className="nav-link">
                <FaDumbbell /> Workouts
              </Link>
              <Link to="/history" className="nav-link">
                <FaHistory /> History
              </Link>
              <Link to="/profile" className="nav-link">
                <FaUserCircle /> Profile
              </Link>
              <button onClick={handleClick} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
              <span className="user-email">{user.email}</span>
            </div>
          )}
          
          {!user && (
            <div className="auth-links">
              <Link to="/login" className="auth-button login">Login</Link>
              <Link to="/signup" className="auth-button signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;