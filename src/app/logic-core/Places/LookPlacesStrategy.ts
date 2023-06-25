import { Strategy } from 'src/app/interfaces/strategy';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { InterpreterService } from 'src/app/services/interpreter.service';
import {
  convertToNumber,
  getGoogleMapsURL,
  placeCodeName,
} from './LookPlacesUtils';
import { PlacesGroup } from 'src/app/models/PlacesModels/placesGroup';
import { PlacesProperties } from 'src/app/models/PlacesModels/placesProperties';
import { parse } from 'date-fns';

export class LookUpPlacesStrategy implements Strategy {
  constructor(private interpreterService: InterpreterService) {}

  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let cityId: string = '';
      let cityName: string = '';
      let quantity: number = -1;
      let place: string = '';
      let placePrint: string = '';
      let responseToBot: string = '';
      let placesProperties: PlacesProperties[] = [];
      entities.forEach((x) => {
        if (x.category === 'City') {
          cityName = x.text;
        }
        if (x.category === 'QuantityText') {
          quantity = convertToNumber(x.text);
        }
        if (x.category === 'QuantityNumber') {
          quantity = parseInt(x.text);
        }
        if (x.category === 'Category') {
          place = placeCodeName(x.text);
          placePrint = x.text;
        }
      });
      if (quantity === 1) {
        responseToBot +=
          'Here is the ' +
          placePrint +
          ' information in ' +
          cityName +
          ':<br><br>';
      }else if(quantity === -1){
        responseToBot +=
          'Here are the ' +
          placePrint +
          ' information in ' +
          cityName +
          ':<br><br>';
      } 
      
      else {
        responseToBot +=
          'Here are ' +
          quantity +
          ' ' +
          placePrint +
          ' information in ' +
          cityName +
          ':<br><br>';
      }
      this.interpreterService.getCityId(cityName).subscribe({
        next: (data: string) => {
          cityId = data;
          this.interpreterService.getPlaces(place, cityId, quantity).subscribe({
            next: (data: PlacesGroup[]) => {
              placesProperties = data[0].features.map((x) => x.properties);
              placesProperties.forEach((place: PlacesProperties) => {
                responseToBot +=
                  'Name: ' +
                  place.name +
                  '<br> Address: ' +
                  place.formatted +
                  '<br> Google Maps Location: <a href="' +
                  getGoogleMapsURL(place.lat, place.lon) +
                  '" target="_blank" rel="noopener noreferrer">View on Google Maps</a>' +
                  '<br><br>';
              });
              resolve(responseToBot);
            },
            error: (err) => {
              responseToBot = 'Error: ' + err;
              reject(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}
