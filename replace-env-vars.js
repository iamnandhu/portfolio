const fs = require('fs');
const path = require('path');

const envFiles = [
  './dist/portfolio/assets/env.js',
  './dist/portfolio/assets/runtime-env.js'
];

// Function to replace placeholders with environment variables
function replacePlaceholders(content) {
  // Log the environment variables for debugging
  console.log('Environment variables available:');
  console.log('NG_APP_EMAILJS_SERVICE_ID:', process.env.NG_APP_EMAILJS_SERVICE_ID ? '[SET]' : '[NOT SET]');
  console.log('NG_APP_EMAILJS_TEMPLATE_ID:', process.env.NG_APP_EMAILJS_TEMPLATE_ID ? '[SET]' : '[NOT SET]');
  console.log('NG_APP_EMAILJS_PUBLIC_KEY:', process.env.NG_APP_EMAILJS_PUBLIC_KEY ? '[SET]' : '[NOT SET]');

  // Define replacements with actual environment variables
  const replacements = {
    'INJECT_NG_APP_EMAILJS_SERVICE_ID': process.env.NG_APP_EMAILJS_SERVICE_ID || '',
    'INJECT_NG_APP_EMAILJS_TEMPLATE_ID': process.env.NG_APP_EMAILJS_TEMPLATE_ID || '',
    'INJECT_NG_APP_EMAILJS_PUBLIC_KEY': process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''
  };

  // Perform replacements
  let processedContent = content;
  Object.entries(replacements).forEach(([placeholder, value]) => {
    processedContent = processedContent.replace(new RegExp(placeholder, 'g'), value);
  });

  return processedContent;
}

// Process each file
envFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${filePath}...`);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const processedContent = replacePlaceholders(content);
      fs.writeFileSync(filePath, processedContent, 'utf8');
      console.log(`✅ Successfully processed ${filePath}`);
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  } else {
    console.warn(`⚠️ File not found: ${filePath}`);
  }
});

// Create a simple HTML file for debugging environment variables
try {
  const debugHtmlPath = './dist/portfolio/env-debug.html';
  const debugHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Environment Variables Debug</title>
</head>
<body>
  <h1>Environment Variables Debug</h1>
  <p>Check the console for environment variables.</p>
  <script>
    console.log('Window env variables:', window.env);
  </script>
</body>
</html>
  `;
  fs.writeFileSync(debugHtmlPath, debugHtml, 'utf8');
  console.log(`✅ Created debug HTML at ${debugHtmlPath}`);
} catch (error) {
  console.error('❌ Error creating debug HTML:', error);
}

console.log('✅ Environment variable injection complete'); 