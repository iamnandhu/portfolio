/**
 * IMPORTANT: This is an alternative approach if the other methods fail.
 * 
 * This script directly creates environment files with the actual values.
 * This approach is NOT recommended for public repositories since it exposes secrets.
 * For testing/development purposes only.
 */

const fs = require('fs');

// Try to get values from environment first, then fall back to hardcoded values
const EMAIL_SERVICE_ID = process.env.NG_APP_EMAILJS_SERVICE_ID || ''; // Your EmailJS service ID
const EMAIL_TEMPLATE_ID = process.env.NG_APP_EMAILJS_TEMPLATE_ID || ''; // Your EmailJS template ID 
const EMAIL_PUBLIC_KEY = process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''; // Your EmailJS public key

// Check if we have values
if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
  console.warn('⚠️ One or more EmailJS environment variables are missing:');
  console.warn(`SERVICE_ID: ${EMAIL_SERVICE_ID ? '✅ Set' : '❌ Missing'}`);
  console.warn(`TEMPLATE_ID: ${EMAIL_TEMPLATE_ID ? '✅ Set' : '❌ Missing'}`);
  console.warn(`PUBLIC_KEY: ${EMAIL_PUBLIC_KEY ? '✅ Set' : '❌ Missing'}`);
  console.warn('You should either:');
  console.warn('1. Set them in your .env file or environment');
  console.warn('2. Hardcode them in this file (NOT recommended for production/public repos)');
}

const envJsContent = `(function(window) {
  window.env = window.env || {};
  window.env['NG_APP_EMAILJS_SERVICE_ID'] = '${EMAIL_SERVICE_ID}';
  window.env['NG_APP_EMAILJS_TEMPLATE_ID'] = '${EMAIL_TEMPLATE_ID}';
  window.env['NG_APP_EMAILJS_PUBLIC_KEY'] = '${EMAIL_PUBLIC_KEY}';
})(this);`;

// Directory paths
const directories = [
  './dist/portfolio/assets',
  './src/assets'
];

// Ensure directories exist
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Write the environment file
directories.forEach(dir => {
  const filePath = `${dir}/env.js`;
  fs.writeFileSync(filePath, envJsContent);
  console.log(`Created environment file: ${filePath}`);
});

console.log('✅ Direct environment setup complete');
if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
  console.log('⚠️ Warning: Some environment variables are empty, email functionality may not work');
} 