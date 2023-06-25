import { Strategy } from 'src/app/interfaces/strategy';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { InterpreterService } from 'src/app/services/interpreter.service';
import { removeSpaces } from './FlightStatusUtils';
import { FlightDetailsInfo } from 'src/app/models/FlightsModels/flightDetailsInfo';

export class FlightStatusStrategy implements Strategy {
  constructor(private interpreterService: InterpreterService) {}

  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = '';
      let flightNumber: string = '';
      flightNumber = removeSpaces(entities[0].text);
      flightNumber = flightNumber.toUpperCase();
      responseToBot +=
        'Here is the flight status of ' + flightNumber + ':<br><br>';
      this.interpreterService.getFlightInfo(flightNumber).subscribe({
        next: (data: FlightDetailsInfo) => {
          responseToBot += 'Flight date: ' + data.flightDate + '<br>';
          responseToBot += 'Flight status: ' + data.flightStatus + '<br>';
          responseToBot +=
            'Departure airport: ' + data.flightDeparture.airport + '<br>';
          responseToBot +=
            'Scheduled time for departure: ' +
            data.flightDeparture.scheduled +
            '<br>';
          responseToBot +=
            'Arrival airport: ' + data.flightArrival.airport + '<br>';
          responseToBot +=
            'Scheduled time for arrival: ' +
            data.flightArrival.scheduled +
            '<br>';
          responseToBot += 'Flight number: ' + data.flight.number + '<br>';
          responseToBot += 'Flight IATA: ' + data.flight.iata + '<br>';
          resolve(responseToBot);
        },
        error: (err) => {
          responseToBot = 'Error: en cancelar el evento';
          reject(err);
        },
      });
    });
  }
}
