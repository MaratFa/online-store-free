
import React from 'react';
import { Button, Input } from '../../../components/shared';
import { useState } from 'react';
import './ResetPassword.css';

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (error) {
      setErrors({ general: 'Password reset failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="reset-success">
        <h2>Password Reset Successful</h2>
        <p>
          Your password has been reset successfully. You can now sign in with your new password.
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/account'}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1 className="reset-password-title">Reset Password</h1>
        <p className="reset-password-subtitle">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={errors.password}
            required
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
          />

          {errors.general && (
            <div className="form-error">{errors.general}</div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};
