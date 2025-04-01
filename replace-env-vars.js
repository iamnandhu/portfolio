const fs = require('fs');
const path = require('path');

const envFiles = [
  './dist/portfolio/assets/env.js'
];

// Output environment variables for debugging (will only show in build logs)
console.log('Environment variables in build:');
console.log('NG_APP_EMAILJS_SERVICE_ID present:', !!process.env.NG_APP_EMAILJS_SERVICE_ID);
console.log('NG_APP_EMAILJS_TEMPLATE_ID present:', !!process.env.NG_APP_EMAILJS_TEMPLATE_ID);
console.log('NG_APP_EMAILJS_PUBLIC_KEY present:', !!process.env.NG_APP_EMAILJS_PUBLIC_KEY);

// Direct replacement approach - avoids using placeholders
const envJsContent = `(function(window) {
  window.env = window.env || {};
  window.env['NG_APP_EMAILJS_SERVICE_ID'] = '${process.env.NG_APP_EMAILJS_SERVICE_ID || ""}';
  window.env['NG_APP_EMAILJS_TEMPLATE_ID'] = '${process.env.NG_APP_EMAILJS_TEMPLATE_ID || ""}';
  window.env['NG_APP_EMAILJS_PUBLIC_KEY'] = '${process.env.NG_APP_EMAILJS_PUBLIC_KEY || ""}';
})(this);`;

// Process each file
envFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, envJsContent, 'utf8');
      console.log(`Updated ${filePath} directly with environment values`);
    } catch (error) {
      console.error(`Error updating ${filePath}:`, error);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}); 