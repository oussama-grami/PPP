import {Component, OnInit} from '@angular/core';
import {CarbonFootprintService} from '../../Service/carbon-footprint.service';
import {CarbonFootprintResponse} from '../../Models/carbonFootprintResponse';
import {ActivatedRoute} from '@angular/router';
import {RoutesEnum} from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-resultat-carbone',
  templateUrl: './resultat-carbone.component.html',
  styleUrls: ['./resultat-carbone.component.css'],
})
export class ResultatCarboneComponent implements OnInit {
  carbonFootprintResponse: CarbonFootprintResponse | null = null;
  calculationId?: number;

  constructor(
    private carboneFootprintService: CarbonFootprintService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      const calcId = params.get('id');
      if (calcId) this.calculationId = +calcId;
      console.log("Resultat Carbone Component - Calculation ID:", this.calculationId);
      this.carboneFootprintService.getEnterpriseRecommendations(this.calculationId!);
      this.carboneFootprintService
        .getCalculationByIdOrLast(this.calculationId)
        .subscribe(response => {
          this.carbonFootprintResponse = response;
          console.log("Resultat Carbone Component - Carbon Footprint Response:", this.carbonFootprintResponse);
        });

    });
  }

  protected readonly RoutesEnum = RoutesEnum;
}
