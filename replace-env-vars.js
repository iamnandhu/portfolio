const fs = require('fs');
const path = require('path');

const envFiles = [
  './dist/portfolio/assets/env.js',
  './dist/portfolio/assets/runtime-env.js'
];

// Function to replace placeholders with environment variables
function replacePlaceholders(content) {
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

console.log('✅ Environment variable injection complete'); 