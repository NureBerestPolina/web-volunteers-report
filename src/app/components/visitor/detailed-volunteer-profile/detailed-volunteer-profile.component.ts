import { Component } from '@angular/core';
import { VolunteerStatisticsProfile } from '../../../models/dtos/volunteer-statistics-profile.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from '../../../services/visitor/volunteer.service';

@Component({
  selector: 'app-detailed-volunteer-profile',
  templateUrl: './detailed-volunteer-profile.component.html',
  styleUrl: './detailed-volunteer-profile.component.css'
})
export class DetailedVolunteerProfileComponent {
  id: string | null = null;
  profile?: VolunteerStatisticsProfile;

  routeSubscription?: Subscription;
  getProfileSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getProfileSubscription?.unsubscribe();
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
        }
      },
    });
  }
}
