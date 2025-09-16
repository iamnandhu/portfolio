import { Component, OnInit } from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  features: string[];
  license: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    {
      title: 'GoMail',
      description: 'A lightweight, high-performance SMTP client API built in Go. Features connection pooling, retry mechanisms, email tracking, and JWT authentication. Perfect for applications requiring reliable email delivery with comprehensive monitoring.',
      technologies: ['Go', 'MongoDB', 'SMTP', 'JWT', 'REST API'],
      githubUrl: 'https://github.com/iamnandhu/GoMail',
      features: [
        'High Performance - Connection pooling and concurrent email sending',
        'Retry Mechanism - Automatic retries for failed email attempts',
        'Email Tracking - MongoDB integration for email history and analytics',
        'Authentication - JWT-based authentication for API endpoints',
        'Rich Content - Support for HTML emails and attachments',
        'Bulk Operations - Send multiple emails in a single request'
      ],
      license: 'MIT'
    },
    {
      title: 'Select-to-Speak',
      description: 'An NLP based Chrome extension that processes selected text on the screen and converts it into natural sounding speech. Built with AWS Amplify and utilizes AWS Amplify Predictions to add machine learning capabilities to the application.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'AWS Amplify', 'NLP', 'Chrome Extension'],
      githubUrl: 'https://github.com/iamnandhu/select-to-speak',
      features: [
        'Text-to-Speech - Converts selected text into natural sounding speech',
        'Multi-language Support - Input support for Dutch, Portuguese, English, Italian, French, Spanish',
        'Voice Output - Output in 16 different languages including Arabic, Chinese, Hindi, Japanese',
        'AWS Integration - Built with AWS Amplify and machine learning predictions',
        'Browser Extension - Easy-to-use Chrome extension interface',
        'Real-time Processing - Instant text processing and speech conversion'
      ],
      license: 'Open Source'
    },
    {
      title: 'DDoS Detection in SDN using ML',
      description: 'A comprehensive research project focused on detecting Distributed Denial of Service (DDoS) attacks in Software-Defined Networks (SDN) using advanced machine learning algorithms. Implements and compares multiple tree-based classifiers for cybersecurity threat detection.',
      technologies: ['Python', 'Jupyter Notebook', 'Machine Learning', 'Random Forest', 'XGBoost', 'LightGBM', 'CatBoost'],
      githubUrl: 'https://github.com/iamnandhu/DDoS-detection-in-SDN-using-ML',
      features: [
        'Multiple ML Algorithms - Random Forest, Decision Tree, LightGBM, XGBoost, CatBoost, AdaBoost',
        'SDN Security - Specialized for Software-Defined Network attack detection',
        'Comparative Analysis - Performance evaluation across different tree-based classifiers',
        'Research Implementation - Academic-grade implementation with detailed analysis',
        'Cybersecurity Focus - Advanced threat detection and network security',
        'Data Science Pipeline - Complete ML workflow from data preprocessing to model evaluation'
      ],
      license: 'Research Project'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
