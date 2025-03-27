import { Component, OnInit } from '@angular/core';

interface experience {
  pathToCompanyLogo: string,
  designation: string,
  companyName: string,
  companyLinkedinURL: string,
  startDate: string,
  isWorking: boolean,
  endDate: string,
  desription: string
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  technisanctLogo: string = 'assets/technisanctLogo.png'

  experiences: experience[] = [
    {
      pathToCompanyLogo: 'assets/technisanctLogo.png',
      designation: "Software Engineer - Fullstack",
      companyName: "Technisanct",
      companyLinkedinURL: "https://www.linkedin.com/company/technisanct/",
      startDate: "'2023-01-16'",
      isWorking: true,
      endDate: "",
      desription: "• Developed core features for falconfeeds.io, a B2C threat intelligence platform, contributing to its successful launch and growth to 500+ active users in just 4 months since launch.\n• Optimized group adding and processing server's performance, one of the integral parts of our telegram OSINT tool, improving performance by 40% through algorithm refinements and concurrency improvements.\n• Built core components of our Telegram OSINT tool's backend in Python and Go, scaled to handle live updates from 100000+ channels with event-driven micro-service based architecture.\n• Designed and implemented internal tooling platform with Angular/Tailwind CSS frontend and Go backend services, creating streamlined interfaces for threat intelligence operations.\n• Built a Role-Based Access Control (RBAC) system for all internal company tools, developing reusable permission modules that standardized access management.\n• Developed automated executive summary generation for threat reports using LLM integrations (OpenAI GPT, Google Gemini) to process structured intelligence data and dark web monitoring feeds, reducing manual analysis workload."
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  convertToDateObj(date: string) {
    return new Date(date)
  }

  getDescriptionPoints(description: string): string[] {
    if (!description) return [];
    return description.split('\n').map(point => point.trim().replace(/^•\s*/, ''));
  }

}
