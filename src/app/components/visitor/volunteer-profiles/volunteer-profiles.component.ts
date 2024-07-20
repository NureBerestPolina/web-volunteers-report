import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '../../../models/volunteer.model';
import { VolunteerService } from '../../../services/visitor/volunteer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer-profiles',
  templateUrl: './volunteer-profiles.component.html',
  styleUrl: './volunteer-profiles.component.css'
})
export class VolunteerProfilesComponent {
  volunteers$?: Observable<Volunteer[]>;

  constructor(
    private volunteerService: VolunteerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {   
    this.volunteers$ = this.volunteerService.getAllVolunteers();
  }
}
