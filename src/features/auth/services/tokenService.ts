
// Token management service
export const tokenService = {
  get: (): string | null => {
    return localStorage.getItem('token');
  },

  set: (token: string): void => {
    localStorage.setItem('token', token);
  },

  remove: (): void => {
    localStorage.removeItem('token');
  },

  getPayload: (): any | null => {
    const token = tokenService.get();
    if (!token) return null;

    try {
      // Split the token into header, payload, and signature
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Decode the payload (base64)
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  isExpired: (): boolean => {
    const payload = tokenService.getPayload();
    if (!payload) return true;

    // Check if token has an expiration date
    if (!payload.exp) return false;

    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Return true if token is expired
    return payload.exp < currentTime;
  }
};
