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
      designation: "Junior Software Engineer",
      companyName: "Technisanct",
      companyLinkedinURL: "https://www.linkedin.com/company/technisanct/",
      startDate: "'2023-01-16'",
      isWorking: true,
      endDate: "",
      desription: "Collaborating with a dynamic team of engineers, contributed to the development of Falconfeeds a B2C threat intelligence platform, from scratch. My role encompassed integrating Generative AI features, developing front-end functionalities, building and optimizing dashboards for internal tools. Worked on a large-scale data collection and monitoring project."
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  convertToDateObj(date: string) {
    return new Date(date)
  }

}
