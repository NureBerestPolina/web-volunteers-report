import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Volunteer } from '../../../models/volunteer.model';
import { MessageService } from 'primeng/api';
import { VolunteerService } from '../../../services/visitor/volunteer.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-volunteers-management',
  templateUrl: './volunteers-management.component.html',
  styleUrl: './volunteers-management.component.css',
  providers: [MessageService, ToastModule]
})
export class VolunteersManagementComponent implements OnInit, OnDestroy {
  volunteers$?: Observable<Volunteer[]>;

  changeStateSubscription?: Subscription;

  private readonly blockMsg = $localize`The volunteer is blocked, the profile is hidden, no functionality available!`;
  private readonly unblockMsg = $localize`The volunteer is unblocked, all the services are available!`;
  private readonly hideMsg = $localize`The volunteer's donation link is hidden!`;
  private readonly showMsg = $localize`The volunteer's donation link is available!`;

  constructor(
    private readonly volunteerService: VolunteerService,
    private readonly router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.volunteers$ = this.volunteerService.getAllRegisteredVolunteers();
  }

  ngOnDestroy(): void {
    this.changeStateSubscription?.unsubscribe();
  }

  block(volunteer: Volunteer): void {
    this.showSuccess(this.blockMsg);
    volunteer.isBlocked = true;
    this.updateState(volunteer);
  }

  unblock(volunteer: Volunteer): void {
    this.showSuccess(this.unblockMsg);
    volunteer.isBlocked = false;
    this.updateState(volunteer);
  }

  hide(volunteer: Volunteer): void {
    this.showSuccess(this.hideMsg);
    volunteer.isHidden = true;
    this.updateState(volunteer);
  }

  show(volunteer: Volunteer): void {
    this.showSuccess(this.showMsg);
    volunteer.isHidden = false;
    this.updateState(volunteer);
  }

  updateState(volunteer: Volunteer): void {
    this.changeStateSubscription = this.volunteerService
      .update(volunteer.id, volunteer)
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            this.router.navigateByUrl('admin/volunteers-management');
          }, 3000);

          this.volunteers$ = this.volunteerService.getAllRegisteredVolunteers();
        },
      });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  getStateColor(isBlocked: boolean = false, isHidden: boolean = false): string {
    if (isBlocked) {
      return 'rgb(255, 146, 146)';
    }
    if (isHidden) {
      return 'rgb(255,165,0)';
    } 
    else {
      return 'white';
    }
  }
}

