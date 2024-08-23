import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Accusation } from '../../../models/accusation.model';
import { AccusationService } from '../../../services/common/accusation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accusations-management',
  templateUrl: './accusations-management.component.html',
  styleUrl: './accusations-management.component.css'
})
export class AccusationsManagementComponent implements OnInit{
  accusations$?: Observable<Accusation[]>;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private accusationService: AccusationService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {   
    this.loadAccusations();
  }

  loadAccusations(): void {
    this.accusations$ = this.accusationService.getActiveAccusations().pipe(
      map(accusations => this.sortAccusations(accusations))
    );
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
}
