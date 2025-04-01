// This script will run in the browser and inject environment variables at runtime
(function() {
  // Function to add the env values to window.env
  function setRuntimeEnv() {
    // Get environment variables from Netlify's runtime environment
    // If we're not on Netlify, this will fall back to the empty values in env.js
    window.env = window.env || {};
    
    // This will be replaced by Netlify's runtime environment injection
    // for example: window.env.NG_APP_EMAILJS_SERVICE_ID = "{{NETLIFY_ENV:NG_APP_EMAILJS_SERVICE_ID}}";
    // But we'll keep it empty here to prevent secrets from being committed
  }

  // Execute when the window loads
  if (document.readyState === 'complete') {
    setRuntimeEnv();
  } else {
    window.addEventListener('load', setRuntimeEnv);
  }
})(); 