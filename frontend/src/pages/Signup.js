// pages/Signup.js
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom"
import { FaUserPlus } from "react-icons/fa"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <FaUserPlus className="auth-icon" />
          <h2>Sign Up</h2>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              id="email"
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              id="password"
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              placeholder="Enter a strong password"
            />
            <small className="password-hint">
              Password must contain at least 8 characters including uppercase, 
              lowercase, number and special character.
            </small>
          </div>

          <button 
            className="auth-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </form>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup