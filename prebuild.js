console.log('Starting prebuild checks...');

// Check for environment variables
const requiredEnvVars = [
  'NG_APP_EMAILJS_SERVICE_ID',
  'NG_APP_EMAILJS_TEMPLATE_ID',
  'NG_APP_EMAILJS_PUBLIC_KEY'
];

let missingVars = [];
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    missingVars.push(varName);
  } else {
    console.log(`✅ ${varName} is set`);
  }
});

if (missingVars.length > 0) {
  console.warn(`⚠️ Warning: The following environment variables are missing: ${missingVars.join(', ')}`);
  console.warn('These should be set in your Netlify dashboard for production builds.');
} else {
  console.log('✅ All required environment variables are set');
}

console.log('Prebuild checks complete!'); 