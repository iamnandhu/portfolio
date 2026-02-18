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
      desription: "As Backend Engineering Lead at FalconFeeds.io, I built and scaled a cybersecurity threat intelligence platform. \n I optimized system performance through caching strategies that reduced analytics latency to sub-second response times.\nArchitected a real-time threat monitoring pipeline processing 25,000+ channels with 50-100ms latency.\n My work on API integrations and an MCP server drove Pro subscription conversion and bringing in new revenue. \nBuilt AI-powered analysis features reducing researcher investigation time."
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
