import React, { useState } from 'react';
import './Account.css';

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [registerMessage, setRegisterMessage] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get form values
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    
    // Simple validation
    if (!email || !password) {
      setLoginMessage('Please fill in all fields');
      return;
    }
    
    // For demo purposes, we'll just show a success message
    // In a real app, you would send this to a server
    setLoginMessage(`Login successful! Welcome ${email}`);
    
    // Store user email in localStorage to simulate authentication
    localStorage.setItem('userEmail', email);
    
    // Redirect to dashboard after successful login
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
    
    // In a real app, you might redirect the user or update the UI state
    console.log('Login attempt with:', { email, password });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get form values
    const name = (document.getElementById('register-name') as HTMLInputElement).value;
    const email = (document.getElementById('register-email') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('register-confirm-password') as HTMLInputElement).value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setRegisterMessage('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setRegisterMessage('Passwords do not match');
      return;
    }
    
    // For demo purposes, we'll just show a success message
    // In a real app, you would send this to a server
    setRegisterMessage(`Registration successful! Welcome ${name}`);
    
    // In a real app, you might redirect the user or update the UI state
    console.log('Registration attempt with:', { name, email, password });
  };

  return (
    <div className="account-section">
      <div className="container">
        <div className="account-form-container">
          <div className="account-tabs">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'login' && (
              <div className="tab-pane active">
                <form className="account-form" onSubmit={handleLogin}>
                  <h2>Login to Your Account</h2>
                  {loginMessage && <div className="form-message">{loginMessage}</div>}
                  <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input type="email" id="login-email" autoComplete="username" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" id="login-password" autoComplete="current-password" required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="tab-pane active">
                <form className="account-form" onSubmit={handleRegister}>
                  <h2>Create an Account</h2>
                  {registerMessage && <div className="form-message">{registerMessage}</div>}
                  <div className="form-group">
                    <label htmlFor="register-name">Full Name</label>
                    <input type="text" id="register-name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-email">Email</label>
                    <input type="email" id="register-email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input type="password" id="register-password" autoComplete="new-password" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-confirm-password">Confirm Password</label>
                    <input type="password" id="register-confirm-password" autoComplete="new-password" required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
