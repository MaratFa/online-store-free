
import React from 'react';
import { Button } from '../../../components/shared';
import './SocialLoginButtons.css';

export const SocialLoginButtons: React.FC = () => {
  return (
    <div className="social-login-buttons">
      <Button variant="outline" className="social-login-button google">
        <span className="social-icon google-icon"></span>
        Continue with Google
      </Button>

      <Button variant="outline" className="social-login-button facebook">
        <span className="social-icon facebook-icon"></span>
        Continue with Facebook
      </Button>
    </div>
  );
};
