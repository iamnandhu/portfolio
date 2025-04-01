export const environment = {
  production: true,
 EMAILJS_SERVICE_ID: (window as any)['env']['NG_APP_EMAILJS_SERVICE_ID'],
  EMAILJS_TEMPLATE_ID: (window as any)['env']['NG_APP_EMAILJS_TEMPLATE_ID'],
  EMAILJS_PUBLIC_KEY: (window as any)['env']['NG_APP_EMAILJS_PUBLIC_KEY']
};
