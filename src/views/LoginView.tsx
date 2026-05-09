import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react';
import './Auth.css';

const LoginView: React.FC = () => {
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
          <h2>Transform the way you collaborate.</h2>
          <p>Experience the next generation of team communication with AI-powered insights and secure messaging.</p>
          
          <div className="glass-stats">
            <div className="stat-card">
              <Zap size={24} color="var(--primary-color)" style={{ marginBottom: '12px' }} />
              <span className="stat-value">10x Faster</span>
              <span className="stat-label">Communication</span>
            </div>
            <div className="stat-card">
              <Shield size={24} color="#3b82f6" style={{ marginBottom: '12px' }} />
              <span className="stat-value">AES-256</span>
              <span className="stat-label">Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Login Form Side */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Ready to start your productive day?</p>
          </div>

          <div className="social-login">
            <button className="google-btn">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Sign in with Google
            </button>
          </div>

          <div className="divider">OR</div>

          <form onSubmit={handleSubmit} className="auth-form">
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

            <div className="form-extras">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="submit-btn">
              Sign In <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create one for free</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
