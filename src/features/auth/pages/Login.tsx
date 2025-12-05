
import React from 'react';
import { LoginForm } from '../components';
import './Login.css';

export const Login: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Sign In</h1>
        <p className="login-subtitle">Welcome back! Please sign in to continue.</p>
        <LoginForm />
      </div>
    </div>
  );
};
