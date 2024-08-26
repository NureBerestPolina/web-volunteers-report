import { Injectable } from '@angular/core';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { Volunteer } from '../../models/volunteer.model';
import { ODataServiceFactory } from 'angular-odata';
import { Observable, map, of } from 'rxjs';
import { VolunteerProfile } from '../../models/dtos/volunteer-profile.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VolunteerStatisticsProfile } from '../../models/dtos/volunteer-statistics-profile.model';
import { CategoryCost } from '../../models/dtos/category-cost.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService extends ODataServiceBase<Volunteer> {
  protected override oDataEntityName = "Volunteers";

  constructor(
    factory: ODataServiceFactory,
    private http: HttpClient ) 
  {
    super(factory);
  }

  getAllVolunteers(): Observable<Volunteer[]> {
    return this.ODataService.entities()
      .query((q) => {
        q.expand('user');
        q.filter(({ e }) => e().eq('isBlocked', false, 'none'));
      })
      .fetch()
      .pipe(this.mapODataEntities);
  }

  getAllRegisteredVolunteers(): Observable<Volunteer[]> {
    return this.ODataService.entities()
      .query((q) => {
        q.expand('user');
      })
      .fetch()
      .pipe(this.mapODataEntities);
  }

  getVolunteerProfiles(): Observable<VolunteerProfile[]> {
    return this.http.get<VolunteerProfile[]>(`${environment.apiBaseUrl}/VolunteerProfiles`, {});
  }

  getVolunteerStatisticsProfile(id: string): Observable<VolunteerStatisticsProfile> {
    return this.http.get<VolunteerStatisticsProfile>(`${environment.apiBaseUrl}/VolunteerStatisticsProfile/${id}`, {});
  }

  getVolunteerCostCategories(id: string): Observable<CategoryCost[]> {
    return this.http.get<CategoryCost[]>(`${environment.apiBaseUrl}/VolunteerSpendingsStatistics/${id}`, {});
  }

  block(id: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/block/${id}`, {});
  }
}
