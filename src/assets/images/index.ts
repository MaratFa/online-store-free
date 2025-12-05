
// Export all images from this directory
export const images = {
  // Add image imports here as needed
  // Example: export { default as logo } from './logo.png';
};

// Helper function to get image path
export const getImagePath = (imageName: string): string => {
  return `/images/${imageName}`;
};
