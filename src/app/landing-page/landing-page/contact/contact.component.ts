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
    // Initialize EmailJS with your public key
    emailjs.init(this.PUBLIC_KEY);
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

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: this.f['name'].value,
      from_email: this.f['email'].value,
      message: this.f['message'].value,
      to_email: 'nandhus1810@gmail.com'
    };

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
