
import React from 'react';
import { RegisterForm } from '../components';
import './Register.css';

export const Register: React.FC = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Join us today and start shopping!</p>
        <RegisterForm />
      </div>
    </div>
  );
};
