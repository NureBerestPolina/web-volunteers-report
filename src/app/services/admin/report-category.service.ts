import { Injectable } from '@angular/core';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { ReportCategory } from '../../models/report-category.model';
import { ODataServiceFactory } from 'angular-odata';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportCategoryService extends ODataServiceBase<ReportCategory> {
  protected override oDataEntityName = "Categories";

  constructor(
    factory: ODataServiceFactory,
    private http: HttpClient ) 
  {
    super(factory);
  }

  getActiveCategories(): Observable<ReportCategory[]> {
    return this.ODataService.entities()
      .query((q) => {       
        q.filter(({ e }) => e().eq('isDeleted', false, 'none'));
      })
      .fetch()
      .pipe(this.mapODataEntities);
  }
}
