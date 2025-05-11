import { Component, OnInit } from '@angular/core';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { CarbonFootprintResponse } from '../../Models/carbonFootprintResponse';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-resultat-carbone',
  templateUrl: './resultat-carbone.component.html',
  styleUrls: ['./resultat-carbone.component.css'],
})
export class ResultatCarboneComponent implements OnInit {
  carbonFootprintResponse: CarbonFootprintResponse | null = null;
  companyOwnerId: number = 0;
  calculationId?: number;

  constructor(
    private carboneFootprintService: CarbonFootprintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      const ownerId = params.get('companyOwnerId');
      const calcId = params.get('id');
      this.companyOwnerId =7;
      if (calcId) this.calculationId = +calcId;

      this.carboneFootprintService
        .getCalculationByIdOrLast(this.companyOwnerId, this.calculationId)
        .subscribe(response => {
          this.carbonFootprintResponse = response;
        });
    });
  }

  protected readonly RoutesEnum = RoutesEnum;
}
