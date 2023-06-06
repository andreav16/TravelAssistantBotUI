import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EventType } from '../models/eventType';

@Injectable({
  providedIn: 'root',
})
export class InterpreterService {
  constructor(private httpClient: HttpClient) {}

  getEventType(query: string): Observable<EventType> {
    return this.httpClient.get<EventType>(`${environment.baseApiUrl}/interpreter/${query}`);
  }

  addEventToCalendar(body:any){
    return this.httpClient.post(`${environment.baseApiUrl}/events`,body);
  }
}
