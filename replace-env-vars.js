const fs = require('fs');
const path = './dist/portfolio/assets/env.js';

// Create an env.js that doesn't contain the actual values
// but just creates the structure - values will be injected at runtime
const envFileContent = `(function(window) {
  window.env = window.env || {};
  window.env['NG_APP_EMAILJS_SERVICE_ID'] = '';
  window.env['NG_APP_EMAILJS_TEMPLATE_ID'] = '';
  window.env['NG_APP_EMAILJS_PUBLIC_KEY'] = '';
})(this);`;

fs.writeFile(path, envFileContent, 'utf8', function(err) {
  if (err) return console.error('Failed to write env.js', err);
  console.log('✅ env.js created successfully');
}); 