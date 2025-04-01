// Log window.env to debug
console.log('Window env vars:', (window as any)['env']);

// If using direct values for testing/development
// Replace these with your actual values when testing locally
// These will NOT be used in production if window.env values exist
const DEVELOPMENT_VALUES = {
  SERVICE_ID: '',  // For testing only
  TEMPLATE_ID: '', // For testing only
  PUBLIC_KEY: ''   // For testing only
};

export const environment = {
  production: true,
  EMAILJS_SERVICE_ID: (window as any)['env']?.['NG_APP_EMAILJS_SERVICE_ID'] || DEVELOPMENT_VALUES.SERVICE_ID,
  EMAILJS_TEMPLATE_ID: (window as any)['env']?.['NG_APP_EMAILJS_TEMPLATE_ID'] || DEVELOPMENT_VALUES.TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: (window as any)['env']?.['NG_APP_EMAILJS_PUBLIC_KEY'] || DEVELOPMENT_VALUES.PUBLIC_KEY
};
