import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EventType } from '../models/InterpreterModels/eventType';
import { EventDetails } from '../models/CalendarModels/eventDetails';
import { PlacesProperties } from '../models/PlacesModels/placesProperties';
import { PlacesGroup } from '../models/PlacesModels/placesGroup';

@Injectable({
  providedIn: 'root',
})
export class InterpreterService {
  constructor(private httpClient: HttpClient) {}

  //Interpreter
  getEventType(query: string): Observable<EventType> {
    return this.httpClient.get<EventType>(
      `${environment.baseApiUrl}/interpreter/${query}`
    );
  }

  //Calendar
  addEventToCalendar(body: any) {
    return this.httpClient.post(`${environment.baseApiUrl}/events`, body);
  }

  listEventsFromCalendar(): Observable<EventDetails[]> {
    return this.httpClient.get<EventDetails[]>(
      `${environment.baseApiUrl}/events`
    );
  }

  cancelEventsFromCalendar(eventName: string) {
    return this.httpClient.delete(
      `${environment.baseApiUrl}/events?eventName=${eventName}`);
  }

  //Places
  getCityId(cityName: any): Observable<string> {
    return this.httpClient.get(`${environment.baseApiUrl}/geopify/${cityName}`, { responseType: 'text' });
  }

  getPlaces(placeCategory: string, cityId: string, cantDatos:number): Observable<PlacesGroup[]> {
    return this.httpClient.get<PlacesGroup[]>(`${environment.baseApiUrl}/geopify/${placeCategory}/${cityId}/${cantDatos}`);
  }
}
