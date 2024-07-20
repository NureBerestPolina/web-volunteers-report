import { Injectable } from '@angular/core';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { Volunteer } from '../../models/volunteer.model';
import { ODataServiceFactory } from 'angular-odata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService extends ODataServiceBase<Volunteer> {
  protected override oDataEntityName = "Volunteers";

  constructor(factory: ODataServiceFactory) {
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
}
