import { Strategy } from 'src/app/interfaces/strategy';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { FlightsService } from 'src/app/services/flights.service';
import { parseTextDatetoDatetime } from '../Calendar/addEventUtils';
import { FlightDetailsInfo } from 'src/app/models/FlightsModels/flightDetailsInfo';

export class SearchFlightStrategy implements Strategy {
  constructor(private flightService: FlightsService) {}
  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = '';
      let originCity: string = '';
      let destinationCity: string = '';
      let flightDate: string = '';
      entities.forEach((entity) => {
        if (entity.category === 'OriginCity') {
          originCity = entity.text;
        }
        if (entity.category === 'DestinyCity') {
          destinationCity = entity.text;
        }
        if (entity.category === 'StartDate') {
          flightDate = parseTextDatetoDatetime(entity.text);
        }
      });

      responseToBot =
        'Flights from ' +
        originCity +
        ' to ' +
        destinationCity +
        ' on ' +
        flightDate +
        '<br><br>';

      this.flightService
        .searchFlight(originCity, destinationCity, flightDate)
        .subscribe({
          next: (flights: FlightDetailsInfo[]) => {
            flights.forEach((flight) => {
              responseToBot += 'Flight date: ' + flight.flightDate + '<br>';
              responseToBot += 'Flight status: ' + flight.flightStatus + '<br>';
              responseToBot +=
                'Departure airport: ' + flight.flightDeparture.airport + '<br>';
              responseToBot +=
                'Scheduled time for departure: ' +
                flight.flightDeparture.scheduled +
                '<br>';
              responseToBot +=
                'Arrival airport: ' + flight.flightArrival.airport + '<br>';
              responseToBot +=
                'Scheduled time for arrival: ' +
                flight.flightArrival.scheduled +
                '<br>';
              responseToBot +=
                'Flight number: ' + flight.flight.number + '<br>';
              responseToBot +=
                'Flight IATA: ' + flight.flight.iata + '<br><br>';
            });
            resolve(responseToBot);
          },
          error: (err) => {
            const errorMessage =
              'There are no flights available for the selected date';
            reject(new Error(errorMessage));
          },
        });
    });
  }
}
