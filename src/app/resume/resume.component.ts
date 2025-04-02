import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  downloadResume() {
    const resumePath = 'assets/NandhuS.pdf';
    
    // Create an anchor element
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'NandhuS_Resume.pdf';
    
    // Append to the document
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  }
}
