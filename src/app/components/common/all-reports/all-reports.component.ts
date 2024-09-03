import { Component } from '@angular/core';
import { User } from '../../../models/auth/user.model';
import { Role } from '../../../models/auth/roles.enum';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ReportService } from '../../../services/visitor/report.service';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrl: './all-reports.component.css'
})
export class AllReportsComponent {
  user?: User;
  role = Role;
  sortOrder: 'asc' | 'desc' = 'asc';

  userSubscription$?: Subscription;
  deleteReportSubscription?: Subscription;
  reports$?: Observable<Report[]>;

  constructor(
    private authService: AuthService,
    protected reportService: ReportService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.authService.user().subscribe({
      next: (user) => {
        this.user = user;
      },
    });

    this.loadReports();
  }

  ngOnDestroy(): void {
    this.userSubscription$?.unsubscribe();
    this.deleteReportSubscription?.unsubscribe();
  }

  countTotalUsd(report: Report): number {
    return report.reportDetails.reduce((total, item) => total + item.costUsd, 0);
  }

  delete(report: Report) {
    report.isDeleted = true;
    
    this.deleteReportSubscription = this.reportService
      .update(report.id, report)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        },
      });
  }

  loadReports(): void {
    this.reports$ = this.reportService.getAllReports().pipe(
      map(reports => this.sortReports(reports))
    );
  }

  sortReports(reports: Report[]): Report[] {
    return reports.sort((a, b) => {
      const dateA = new Date(a.created || 0).getTime();
      const dateB = new Date(b.created || 0).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  onSortOrderChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOrder = selectElement.value as 'asc' | 'desc';
    this.loadReports();
  }
}
