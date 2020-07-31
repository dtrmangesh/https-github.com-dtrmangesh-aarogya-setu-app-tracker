import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeekDatesService {

  constructor(private readonly http: HttpClient) {}

  getWeekDates():  Observable<any>  {
    const url = 'http://localhost:8081/week/userWeekData';
    return this.http.get(url, { headers: { 'user-id': 'dd' }});
  }
}

