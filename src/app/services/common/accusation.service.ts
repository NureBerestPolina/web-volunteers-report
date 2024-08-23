import { Injectable } from '@angular/core';
import { Accusation } from '../../models/accusation.model';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { ODataServiceFactory } from 'angular-odata';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccusationService extends ODataServiceBase<Accusation> {
  protected override oDataEntityName = "Accusations";

  constructor(
    factory: ODataServiceFactory,
    private http: HttpClient ) 
  {
    super(factory);
  }

  getActiveAccusations(): Observable<Accusation[]> {
    return this.ODataService.entities()
      .query((q) => {
        q.expand('user,volunteer/user');        
        q.filter(({ e }) => e().eq('status', 'New'));
      })
      .fetch()
      .pipe(this.mapODataEntities);
  }
}
