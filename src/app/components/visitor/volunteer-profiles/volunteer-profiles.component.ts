import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Volunteer } from '../../../models/volunteer.model';
import { VolunteerService } from '../../../services/visitor/volunteer.service';
import { Router } from '@angular/router';
import { VolunteerProfile } from '../../../models/dtos/volunteer-profile.model';

@Component({
  selector: 'app-volunteer-profiles',
  templateUrl: './volunteer-profiles.component.html',
  styleUrl: './volunteer-profiles.component.css'
})
export class VolunteerProfilesComponent {
  volunteers$?: Observable<VolunteerProfile[]>;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private volunteerService: VolunteerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {   
    this.loadVolunteers();
  }

  loadVolunteers(): void {
    this.volunteers$ = this.volunteerService.getVolunteerProfiles().pipe(
      map(volunteers => this.sortVolunteers(volunteers))
    );
  }

  sortVolunteers(volunteers: VolunteerProfile[]): VolunteerProfile[] {
    return volunteers.sort((a, b) => {
      const dateA = new Date(a.user?.registerDate || 0).getTime();
      const dateB = new Date(b.user?.registerDate || 0).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  onSortOrderChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOrder = selectElement.value as 'asc' | 'desc';
    this.loadVolunteers();
  }
}
