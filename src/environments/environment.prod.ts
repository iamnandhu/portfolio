// Check if environment variables are loaded
const envVars = (window as any)['env'] || {};
const serviceId = envVars['NG_APP_EMAILJS_SERVICE_ID'];
const templateId = envVars['NG_APP_EMAILJS_TEMPLATE_ID'];
const publicKey = envVars['NG_APP_EMAILJS_PUBLIC_KEY'];

// In production, log a warning if env vars are missing (only visible in browser console)
if (!serviceId || !templateId || !publicKey) {
  console.warn('EmailJS environment variables are missing. Contact form will not work!');
}

export const environment = {
  production: true,
  EMAILJS_SERVICE_ID: serviceId || '',
  EMAILJS_TEMPLATE_ID: templateId || '',
  EMAILJS_PUBLIC_KEY: publicKey || ''
};
