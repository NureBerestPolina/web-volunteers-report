import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Accusation } from '../../../models/accusation.model';
import { AccusationService } from '../../../services/common/accusation.service';
import { Router } from '@angular/router';
import { VolunteerService } from '../../../services/visitor/volunteer.service';
import { AccusationStatus } from '../../../utils/accusation-status';
import { Volunteer } from '../../../models/volunteer.model';

@Component({
  selector: 'app-accusations-management',
  templateUrl: './accusations-management.component.html',
  styleUrl: './accusations-management.component.css',
})
export class AccusationsManagementComponent implements OnInit {
  accusations$?: Observable<Accusation[]>;
  sortOrder: 'asc' | 'desc' = 'asc';
  updateAccusationSubscription?: Subscription;
  blockVolunteerSubscription?: Subscription;
  volunteerSubscription?: Subscription;
  volunteer?: Volunteer | null;

  constructor(
    private accusationService: AccusationService,
    private readonly router: Router,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit(): void {
    this.loadAccusations();
  }

  loadAccusations(): void {
    this.accusations$ = this.accusationService
      .getActiveAccusations()
      .pipe(map((accusations) => this.sortAccusations(accusations)));
  }

  sortAccusations(accusations: Accusation[]): Accusation[] {
    return accusations.sort((a, b) => {
      const dateA = new Date(a.created || 0).getTime();
      const dateB = new Date(b.created || 0).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  onSortOrderChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOrder = selectElement.value as 'asc' | 'desc';
    this.loadAccusations();
  }

  rejectAccusation(accusation: Accusation): void {
    accusation.status = AccusationStatus.Rejected;
    this.unhideVolunteer(accusation.volunteerId);
    this.updateAccusation(accusation);
  }

  acceptAccusation(accusation: Accusation): void {
    accusation.status = AccusationStatus.Accepted;
    this.blockVolunteer(accusation.volunteerId);
    this.updateAccusation(accusation);
  }

  blockVolunteer(id: string): void {
    this.blockVolunteerSubscription = this.volunteerService
      .block(id)
      .subscribe({
        next: () => this.ngOnInit(),
      });
  }

  unhideVolunteer(id: string): void {
    this.volunteerSubscription = this.volunteerService.getById(id).subscribe({
      next: (volunteer) => {
        this.volunteer = volunteer;
        if (this.volunteer) {
          this.volunteer.isHidden = false;
          this.volunteerService
            .update(this.volunteer.id, this.volunteer)
            .subscribe({
              next: () => this.ngOnInit(),
            });
        }
      },
    });
  }

  updateAccusation(accusation: Accusation) {
    this.updateAccusationSubscription = this.accusationService
      .update(accusation.id, accusation)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/accusations-management');
        },
      });
  }
}
