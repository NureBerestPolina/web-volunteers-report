import { Component } from '@angular/core';
import { VolunteerStatisticsProfile } from '../../../models/dtos/volunteer-statistics-profile.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from '../../../services/visitor/volunteer.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ReportService } from '../../../services/visitor/report.service';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-detailed-volunteer-profile',
  templateUrl: './detailed-volunteer-profile.component.html',
  styleUrl: './detailed-volunteer-profile.component.css',
  providers: [InputTextareaModule, FloatLabelModule, InputTextModule],
})
export class DetailedVolunteerProfileComponent {
  id: string | null = null;
  profile?: VolunteerStatisticsProfile;
  reports$?: Observable<Report[]>;

  routeSubscription?: Subscription;
  getProfileSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getProfileSubscription?.unsubscribe();
  }

  countTotalUsd(report: Report): number {
    return report.reportDetails.reduce((total, item) => total + item.costUsd, 0);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id);

        if (this.id) {
          this.getProfileSubscription = this.volunteerService
            .getVolunteerStatisticsProfile(this.id)
            .subscribe({
              next: (response) => {
                if (response) {
                  this.profile = response;
                  console.log(this.profile);
                } else {
                  console.error(`Volunteer with id: ${this.id} is not found!`);
                }   
              },
            });

          this.reports$ = this.reportService.getVolunteerReports(this.id);
          console.log(this.reports$);
        }
      },
    });
  }
}
