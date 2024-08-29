import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReportCategory } from '../../../models/report-category.model';
import { ReportCategoryService } from '../../../services/admin/report-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-categories-management',
  templateUrl: './report-categories-management.component.html',
  styleUrl: './report-categories-management.component.css'
})
export class ReportCategoriesManagementComponent implements OnInit, OnDestroy{
  categories$?: Observable<ReportCategory[]>;
  deleteCategorySubscription?: Subscription;

  constructor(
    private reportCategoryService: ReportCategoryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.reportCategoryService.getActiveCategories();
  }

  ngOnDestroy(): void {
    this.deleteCategorySubscription?.unsubscribe();
  }

  deleteCategory(category: ReportCategory) : void {
    category.isDeleted = true;

    this.deleteCategorySubscription = this.reportCategoryService
      .update(category.id, category)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        },
      });
  }
}