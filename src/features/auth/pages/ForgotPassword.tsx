
import React from 'react';
import { PasswordResetForm } from '../components';
import './ForgotPassword.css';

export const ForgotPassword: React.FC = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h1 className="forgot-password-title">Reset Password</h1>
        <p className="forgot-password-subtitle">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <PasswordResetForm />
      </div>
    </div>
  );
};
