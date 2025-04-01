const fs = require('fs');
const path = './dist/portfolio/assets/env.js';

const replacements = {
  '__EMAILJS_SERVICE_ID__': process.env.NG_APP_EMAILJS_SERVICE_ID || '',
  '__EMAILJS_TEMPLATE_ID__': process.env.NG_APP_EMAILJS_TEMPLATE_ID || '',
  '__EMAILJS_PUBLIC_KEY__': process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''
};

fs.readFile(path, 'utf8', function(err, data) {
  if (err) return console.error('Failed to read env.js', err);

  let result = data;
  Object.entries(replacements).forEach(([placeholder, value]) => {
    result = result.replace(placeholder, value);
  });

  fs.writeFile(path, result, 'utf8', function(err) {
    if (err) return console.error('Failed to write env.js', err);
    console.log('✅ env.js updated with Netlify env variables');
  });
}); 