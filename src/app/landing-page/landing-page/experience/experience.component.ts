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
      pathToCompanyLogo: 'assets/falconfeeds.png',
      designation: "Full-Stack Engineer",
      companyName: "FalconFeeds.io (pwd. by Technisanct)",
      companyLinkedinURL: "https://www.linkedin.com/company/technisanct/",
      startDate: "2023-01-16",
      isWorking: true,
      endDate: "",
      desription: "As a full-stack engineer at FalconFeeds.io, I helped build its cybersecurity SaaS platform from an initial concept into a revenue-generating product. I guided architectural decisions, contributed to the product roadmap, and mentored engineers while working with a cross-functional team to deliver core features.\n• Key projects included a large-scale IOC collection framework, AI-powered threat Analysis, and a multi-channel alerts system.\n• My role also involved acting as a key engineering contact for clients, leading their technical integrations."
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
