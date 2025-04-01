// This script will run in the browser and inject environment variables at runtime
(function() {
  // Function to add the env values to window.env
  function setRuntimeEnv() {
    window.env = window.env || {};
    
    // For Netlify, these values will be replaced at runtime with the actual environment variables
    // We need to explicitly declare these so Netlify's script processor can find and replace them
    window.env['NG_APP_EMAILJS_SERVICE_ID'] = 'INJECT_NG_APP_EMAILJS_SERVICE_ID';
    window.env['NG_APP_EMAILJS_TEMPLATE_ID'] = 'INJECT_NG_APP_EMAILJS_TEMPLATE_ID';
    window.env['NG_APP_EMAILJS_PUBLIC_KEY'] = 'INJECT_NG_APP_EMAILJS_PUBLIC_KEY';
    
    console.log('Runtime environment variables loaded:', window.env);
  }

  // Execute when the window loads
  if (document.readyState === 'complete') {
    setRuntimeEnv();
  } else {
    window.addEventListener('load', setRuntimeEnv);
  }
})(); 