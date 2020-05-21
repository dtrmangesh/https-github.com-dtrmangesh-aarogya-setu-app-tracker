import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaStatisticsService {

  constructor(private readonly http: HttpClient) {}

  getData():  Observable<any>  {
    const url = 'https://covid19.mathdro.id/api/countries/INDIA';
    return this.http.get(url);
  }
}

