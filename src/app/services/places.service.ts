import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { PlacesGroup } from "../models/PlacesModels/placesGroup";

@Injectable({
    providedIn: 'root',
  })
  export class PlacesService {
    constructor(private httpClient: HttpClient) {}
  
    //Places
    getCityId(cityName: any): Observable<string> {
      return this.httpClient.get(`${environment.baseApiUrl}/geopify/${cityName}`, { responseType: 'text' });
    }
  
    getPlaces(placeCategory: string, cityId: string, cantDatos:number): Observable<PlacesGroup[]> {
      return this.httpClient.get<PlacesGroup[]>(`${environment.baseApiUrl}/geopify/${placeCategory}/${cityId}/${cantDatos}`);
    }
  
  }
  