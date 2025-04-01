/**
 * IMPORTANT: This is an alternative approach if the other methods fail.
 * 
 * This script directly creates environment files with the actual values.
 * This approach is NOT recommended for public repositories since it exposes secrets.
 * For testing/development purposes only.
 */

const fs = require('fs');

// REPLACE THESE WITH YOUR ACTUAL VALUES IF OTHER APPROACHES FAIL
// BUT BE CAUTIOUS ABOUT COMMITTING THIS FILE WITH ACTUAL VALUES
const EMAIL_SERVICE_ID = ''; // Your EmailJS service ID
const EMAIL_TEMPLATE_ID = ''; // Your EmailJS template ID 
const EMAIL_PUBLIC_KEY = ''; // Your EmailJS public key

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
console.log('⚠️ Warning: This approach hardcodes values and should only be used for testing'); 