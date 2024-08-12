import { Injectable } from '@angular/core';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { ODataServiceFactory } from 'angular-odata';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends ODataServiceBase<Report> {
  protected override oDataEntityName = "Reports";

  constructor(
    factory: ODataServiceFactory,
    private http: HttpClient ) 
  {
    super(factory);
  }

  getVolunteerReports(volunteerId: string): Observable<Report[]> {
    return this.ODataService.entities()
      .query((q) => {
        q.expand('reportDetails');
        q.filter(({ e }) => e().eq('isDeleted', false, 'none'));
        q.filter(({ e }) => e().eq('volunteerId', volunteerId, 'none'));
      })
      .fetch()
      .pipe(this.mapODataEntities);
  }
}
