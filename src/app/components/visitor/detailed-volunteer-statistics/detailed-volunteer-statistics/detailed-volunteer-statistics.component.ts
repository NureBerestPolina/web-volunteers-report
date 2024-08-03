import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ChartComponent,
} from 'ng-apexcharts';
import { Observable, Subscription } from 'rxjs';
import { CategoryCost } from '../../../../models/dtos/category-cost.model';
import { VolunteerService } from '../../../../services/visitor/volunteer.service';
import { ActivatedRoute, Router } from '@angular/router';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart | any;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend | any;
};

@Component({
  selector: 'app-detailed-volunteer-statistics',
  templateUrl: './detailed-volunteer-statistics.component.html',
  styleUrls: ['./detailed-volunteer-statistics.component.css'],
})
export class DetailedVolunteerStatisticsComponent implements OnInit, OnDestroy{
  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  id: string | null = null;
  routeSubscription?: Subscription;
  statsSubscription?: Subscription;
  statistics$?: Observable<CategoryCost[]>;

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.statsSubscription?.unsubscribe();
  }

  constructor(
    private volunteerService: VolunteerService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'pie',
        fontFamily: 'Arial, sans-serif'
      },
      labels: [],
      responsive: [
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 500,
            },
            legend: {
              position: 'bottom',
              fontSize: '30px',
            },
          },
        },
      ],
      legend: {
        position: 'right',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif'
      }
    };
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log("stats page" + this.id);

        if (this.id) {
          this.statsSubscription = this.volunteerService
            .getVolunteerCostCategories(this.id).subscribe({
              next: (response) => {
                if (response) {
                response.forEach((categoryCost) => {
                  this.chartOptions.labels.push(categoryCost.categoryName.toString());
                  this.chartOptions.series?.push(categoryCost.costUsd);
                });

                  console.log(this.chartOptions);
                } else {
                  console.error(`Volunteer with id: ${this.id} is not found!`);
                }
              },
            });
        }
      },
    });
  }
}
