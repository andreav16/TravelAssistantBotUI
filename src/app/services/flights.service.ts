import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightDetailsInfo } from '../models/FlightsModels/flightDetailsInfo';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private httpClient: HttpClient) {}
  //Flights
  getFlightInfo(flightNumber: string): Observable<FlightDetailsInfo> {
    return this.httpClient.get<FlightDetailsInfo>(
      `${environment.baseApiUrl}/flights/${flightNumber}`
    );
  }

  searchFlight(
    originCity: string,
    destinationCity: string,
    flightDate: string
  ): Observable<FlightDetailsInfo[]> {
    return this.httpClient.get<FlightDetailsInfo[]>(
      `${environment.baseApiUrl}/flights/${originCity}/${destinationCity}/${flightDate}`
    );
  }
}
