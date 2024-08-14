import { Component } from '@angular/core';
import { Volunteer } from '../../../models/volunteer.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from '../../../services/visitor/volunteer.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  id: string | null = null;
  volunteer?: Volunteer;
  routeSubscription?: Subscription;
  getVolunteerSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getVolunteerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        console.log(this.id);

        if (this.id) {
          this.getVolunteerSubscription = this.volunteerService
            .getById(this.id)
            .subscribe({
              next: (response) => {
                if (response) {
                  this.volunteer = response;
                  console.log(this.volunteer.isHidden);
                } else {
                  console.error(`Volunteer with id: ${this.id} is not found!`);
                  this.router.navigateByUrl('/not-found');
                }
              },
            });
        }
      },
    });
  }
}
