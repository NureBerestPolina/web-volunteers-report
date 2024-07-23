import { Injectable } from '@angular/core';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { Volunteer } from '../../models/volunteer.model';
import { ODataServiceFactory } from 'angular-odata';
import { Observable, of } from 'rxjs';
import { VolunteerProfile } from '../../models/dtos/volunteer-profile.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
        q.filter(({ e }) => e().eq('isHidden', false, 'none'));
      })
      .fetch()
      .pipe(this.mapODataEntities);
  }

  getVolunteerProfiles(): Observable<VolunteerProfile[]> {
    return this.http.get<VolunteerProfile[]>(`${environment.apiBaseUrl}/VolunteerProfiles`, {});
  }
}
