import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react';
import './Auth.css';

const RegisterView: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="auth-container">
      {/* Sidebar with dynamic mesh gradient */}
      <div className="auth-sidebar">
        <div className="sidebar-content">
          <div className="sidebar-logo-wrapper">
            <div className="modern-logo">
              <MessageSquare size={32} color="white" />
            </div>
          </div>
          <h2>Join the future of communication.</h2>
          <p>Create your account in seconds and start collaborating with your team like never before.</p>
          
          <div className="glass-stats">
            <div className="stat-card">
              <Zap size={24} color="var(--primary-color)" style={{ marginBottom: '12px' }} />
              <span className="stat-value">Instant</span>
              <span className="stat-label">Account Setup</span>
            </div>
            <div className="stat-card">
              <Shield size={24} color="#3b82f6" style={{ marginBottom: '12px' }} />
              <span className="stat-value">End-to-End</span>
              <span className="stat-label">Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Register Form Side */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Experience the most modern chat platform.</p>
          </div>

          <div className="social-login">
            <button className="google-btn">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Sign up with Google
            </button>
          </div>

          <div className="divider">OR</div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" size={18} />
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Create Account <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
