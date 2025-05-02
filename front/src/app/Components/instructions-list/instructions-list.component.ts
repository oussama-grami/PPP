import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RecommendationResponse } from '../../Models/recommendation';
import { environment } from '../../../environments/environment';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { EventFootprintService } from '../../Service/event-footprint.service';
import { Subscription } from 'rxjs';
import { CarbonOutput, CarbonResponse } from '../../api/models';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';

@Component({
  selector: 'app-instruction-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.css'],
  animations: [
    trigger('listItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate(
          '0.3s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-20px)' }),
            stagger(500, [
              animate(
                '0.3s ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class InstructionsListComponent implements OnInit, OnDestroy {
  instructions: string[] = [];
  title: string = 'Carbon Reduction Recommendations';

  recommendations: CarbonOutput[] = [];
  loading: boolean = true;
  error: string | null = null;
  isEventMode: boolean = false;

  private recommendationsSubscription: Subscription | null = null;

  constructor(
    private carbonFootprintService: CarbonFootprintService,
    private eventFootprintService: EventFootprintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check the current URL to determine which service to use
    const currentUrl = this.router.url;
    this.isEventMode = currentUrl.includes(RoutesEnum.EVENT_RESULT);

    if (this.isEventMode) {
      this.title = 'Event Carbon Reduction Recommendations';
      // Subscribe to event recommendations
      this.recommendationsSubscription =
        this.eventFootprintService.recommendations$.subscribe(
          (response: CarbonResponse | null) => {
            if (response) {
              this.processRecommendations(response);
              this.loading = false;
            }
          }
        );
    } else {
      this.title = 'Enterprise Carbon Reduction Recommendations';
      // Subscribe to enterprise recommendations
      this.recommendationsSubscription =
        this.carbonFootprintService.recommendations$.subscribe(
          (response: CarbonResponse | null) => {
            if (response) {
              this.processRecommendations(response);
              this.loading = false;
            }
          }
        );
    }
  }

  processRecommendations(response: CarbonResponse): void {
    if (response && response.recommendations) {
      this.recommendations = response.recommendations;
    }
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.recommendationsSubscription) {
      this.recommendationsSubscription.unsubscribe();
    }
  }
}
