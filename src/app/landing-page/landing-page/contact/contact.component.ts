import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  loading = false;
  error = false;

  private readonly SERVICE_ID = environment.EMAILJS_SERVICE_ID;  
  private readonly TEMPLATE_ID = environment.EMAILJS_TEMPLATE_ID; 
  private readonly PUBLIC_KEY = environment.EMAILJS_PUBLIC_KEY; 

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    
    // Debug environment variables
    console.log('Contact component environment variables:');
    console.log('SERVICE_ID:', this.SERVICE_ID);
    console.log('TEMPLATE_ID:', this.TEMPLATE_ID);
    console.log('PUBLIC_KEY:', this.PUBLIC_KEY);
    
    // Initialize EmailJS with your public key
    if (this.PUBLIC_KEY) {
      emailjs.init(this.PUBLIC_KEY);
      console.log('EmailJS initialized');
    } else {
      console.error('EmailJS initialization failed: PUBLIC_KEY is empty');
    }
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = false;
    
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    // Check if environment variables are set
    if (!this.SERVICE_ID || !this.TEMPLATE_ID || !this.PUBLIC_KEY) {
      console.error('Email sending failed. Environment variables are not set properly:',
        { service: this.SERVICE_ID, template: this.TEMPLATE_ID, publicKey: this.PUBLIC_KEY });
      this.error = true;
      this.loading = false;
      return;
    }

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: this.f['name'].value,
      from_email: this.f['email'].value,
      message: this.f['message'].value,
      to_email: 'nandhus1810@gmail.com'
    };

    console.log('Sending email with params:', {
      service: this.SERVICE_ID,
      template: this.TEMPLATE_ID,
      params: templateParams
    });

    // Send email using EmailJS
    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        this.success = true;
        this.loading = false;
        this.contactForm.reset();
        this.submitted = false;
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }, (err) => {
        console.log('FAILED...', err);
        this.error = true;
        this.loading = false;
      });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.success = false;
    this.error = false;
  }
}
