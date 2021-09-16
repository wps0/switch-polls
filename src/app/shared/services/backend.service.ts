import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {format, RouteUtils} from '../RouteUtils';
import {IPoll} from '../models/IPoll';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  getPoll(id: number) {
    console.log(
      'get poll from ',
      format(environment.apiUrl + RouteUtils.POLL, {
        id: id,
      })
    );
    return this.httpClient.get<IPoll>(
      format(environment.apiUrl + RouteUtils.POLL, {
        id: id,
      })
    );
  }
}
