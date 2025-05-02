import { Component, OnInit } from '@angular/core';
import { EsgResponse } from 'src/app/Models/esgResponse';
import { EsgResult } from 'src/app/Models/esgResult';
import { EsgService } from 'src/app/Service/esg.service';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-esg-history',
  templateUrl: './esg-history.component.html',
  styleUrls: ['./esg-history.component.css']
})
export class EsgHistoryComponent implements OnInit {
  responses:EsgResponse[]= [];
  Env:boolean=false;
  Soc:boolean=false;
  Gov:boolean=false;
  result:EsgResult={} as EsgResult;
  
  routesEnum = RoutesEnum;



  constructor(private esgService:EsgService,private router: Router) { }

  ngOnInit() {
    this.esgService.getResponses().subscribe((rawResponses: any[]) => {
      const responses: EsgResponse[] = rawResponses.map(item => ({
        category: item.category,
        responses: item.response
      }));
    


      this.responses = responses;
      this.checkForResponses();
      console.log(this.Soc, this.Env, this.Gov);
    }
    );
  }


  checkForResponses() {
    this.responses.forEach(response => {
      if (response.category === 'ENVIRONMENTAL') {
        if (response.responses.length!=0) {
          this.Env =true;
          console.log(`Environmental responses`);
        }
      }

     
      if (response.category === 'SOCIAL') {
        this.Soc = true;
       
      }

      if (response.category === 'GOVERNANCE') {
        this.Gov=true;
       
      }
    });

   this.esgService.calculateEsg().subscribe((result: EsgResult) => {
      this.result = result;
      console.log(this.result);
    }
    );
  }


  getCategoryIcon(category: string): string {
    switch(category.toLowerCase()) {
      case 'environmental': return 'bi-globe2';
      case 'social': return 'bi-people-fill';
      case 'governance': return 'bi-building';
      default: return 'bi-question-circle';
    }
  }


  getScoreClass(score: number): string {
    if (score > 7) return 'high';
    if (score > 4) return 'medium';
    return 'low';
  }


  navigateToRoadmap() {
    this.router.navigate([this.routesEnum.ROADMAP]).then(() => {
      window.scrollTo(0, 0); 
    });
  }

  navigateToEsgChart() {
    this.router.navigate([this.routesEnum.RESULT_ESG]).then(() => {
      window.scrollTo(0, 0);
    });
  }


  retakeTest() {
   
    this.router.navigate([this.routesEnum.ESG_ASSESSMENT]).then(() => {
      window.scrollTo(0, 0); 
    });

   
  }

  

}
