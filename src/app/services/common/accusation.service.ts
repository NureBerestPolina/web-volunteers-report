import { Injectable } from '@angular/core';
import { Accusation } from '../../models/accusation.model';
import { ODataServiceBase } from '../base/ODataServiceBase';
import { ODataServiceFactory } from 'angular-odata';
import { HttpClient } from '@angular/common/http';

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
}
