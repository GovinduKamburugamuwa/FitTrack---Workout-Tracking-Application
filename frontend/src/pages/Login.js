// pages/Login.js
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <FaUser className="auth-icon" />
          <h2>Login</h2>
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
              placeholder="Enter your password"
            />
          </div>

          <button 
            className="auth-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </form>
        
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login