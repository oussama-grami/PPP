import { Component, OnInit } from '@angular/core';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { CarbonFootprintResponse } from '../../Models/carbonFootprintResponse';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from '../../enumerations/Routes.enum';

@Component({
  selector: 'app-carbon-history',
  templateUrl: './carbon-history.component.html',
  styleUrls: ['./carbon-history.component.css']
})
export class CarbonHistoryComponent implements OnInit {
  companyOwnerId: number = 0;
  carbonHistory: CarbonFootprintResponse[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  protected readonly RoutesEnum = RoutesEnum;

  constructor(
    private carbonFootprintService: CarbonFootprintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = 7;
      if (idParam) {
        this.companyOwnerId = +idParam;
        this.fetchCarbonHistory();
      }
    });
  }

  fetchCarbonHistory(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.carbonFootprintService.getAllByCompanyOwnerId(this.companyOwnerId).subscribe({
      next: (history) => {
        this.carbonHistory = history;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading history.';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  deleteRecord(recordId: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.carbonFootprintService.deleteById(recordId).subscribe({
        next: () => {
          this.carbonHistory = this.carbonHistory.filter(record => record.id !== recordId);
        },
        error: (error) => {
          console.error('Error during deletion:', error);
          alert('Deletion failed. Please try again.');
        }
      });
    }
  }
}
