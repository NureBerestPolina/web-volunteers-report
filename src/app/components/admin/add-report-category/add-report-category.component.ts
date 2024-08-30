import { Component } from '@angular/core';
import { UpsertReportCategory } from '../../../models/dtos/upsert-report-category.model';
import { ReportCategoryService } from '../../../services/admin/report-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-report-category',
  templateUrl: './add-report-category.component.html',
  styleUrl: './add-report-category.component.css'
})
export class AddReportCategoryComponent {
  model: UpsertReportCategory = {
    name: '',
    description: '',
  };
  
  constructor(
    private reportCategoryService: ReportCategoryService,
    private router: Router,
  ) {}

  onFormSubmit(): void {
    this.reportCategoryService.create(this.model).subscribe({
      next: (response) => {
        console.log('Successful creating!', this.model);
        this.router.navigate([
          '/admin/categories-management'
        ]);
      },
      error: (error) => {
        console.error('error', error);
      },
    });
}
}
