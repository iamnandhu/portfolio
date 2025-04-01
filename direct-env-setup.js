/**
 * Environment variables setup script for EmailJS.
 */

const fs = require('fs');

// Get values from environment or use defaults
const EMAIL_SERVICE_ID = process.env.NG_APP_EMAILJS_SERVICE_ID || '';
const EMAIL_TEMPLATE_ID = process.env.NG_APP_EMAILJS_TEMPLATE_ID || '';
const EMAIL_PUBLIC_KEY = process.env.NG_APP_EMAILJS_PUBLIC_KEY || '';

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
  }
});

// Write the environment file
directories.forEach(dir => {
  const filePath = `${dir}/env.js`;
  fs.writeFileSync(filePath, envJsContent);
}); 