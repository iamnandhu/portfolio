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
      startDate: "2023-01-16",
      isWorking: true,
      endDate: "",
      desription: ""
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
