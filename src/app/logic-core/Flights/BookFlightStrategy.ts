import { Strategy } from 'src/app/interfaces/strategy';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { FlightsService } from 'src/app/services/flights.service';
import { removeSpaces } from './FlightStatusUtils';
import { FlightDetailsInfo } from 'src/app/models/FlightsModels/flightDetailsInfo';
import { convertToNumber } from '../Places/LookPlacesUtils';
import { CalendarService } from 'src/app/services/calendar.service';

export class BookFlightStrategy implements Strategy {
  constructor(
    private flightService: FlightsService,
    private calendarService: CalendarService
  ) {}
  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = '';
      let flightNumber: string = '';
      let departureDate: string = '';
      let arrivalDate: string = '';
      let flightInfoDeparture: string = '';
      let flightInfoArrival: string = '';
      let quantity: number = 1;
      flightNumber = removeSpaces(entities[0].text);
      flightNumber = flightNumber.toUpperCase();
      entities.forEach((x) => {
        if (x.category === 'QuantityText') {
          quantity = convertToNumber(x.text);
        }
        if (x.category === 'QuantityNumber') {
          quantity = parseInt(x.text);
        }
        if (x.category === 'FlightNumber') {
          flightNumber = removeSpaces(x.text);
          flightNumber = flightNumber.toUpperCase();
        }
      });
      console.log('numero de vuelo' + flightNumber);
      this.flightService.getFlightInfo(flightNumber).subscribe({
        next: (data: FlightDetailsInfo) => {
          //Departure inforrmation
          flightInfoDeparture =
            'Flight Departure date time: ' +
            data.flightDeparture.scheduled +
            '\n' +
            '\nDeparture airport: ' +
            data.flightDeparture.airport +
            '\n' +
            flightInfoDeparture +
            '\nFlight number: ' +
            data.flight.number +
            '\n' +
            flightInfoDeparture +
            '\nFlight IATA: ' +
            data.flight.iata +
            '\nPlane tickets quantity: ' +
            quantity +
            '\n';
          //Arrival information
          flightInfoArrival =
            'Flight Arrival date time: ' +
            data.flightArrival.scheduled +
            '\n' +
            '\nArrival airport: ' +
            data.flightArrival.airport +
            '\n' +
            '\nFlight number: ' +
            data.flight.number +
            '\n' +
            '\nFlight IATA: ' +
            data.flight.iata +
            '\n\nPlane tickets quantity: ' +
            quantity +
            '\n';

          departureDate = data.flightDeparture.scheduled;
          arrivalDate = data.flightArrival.scheduled;

          const departureBody = {
            summary: 'Flight Booked Departure Info',
            description: flightInfoDeparture,
            startDateTime: departureDate,
            endDateTime: departureDate,
          };
          const arrivalBody = {
            summary: 'Flight Booked Arrival Info',
            description: flightInfoArrival,
            startDateTime: arrivalDate,
            endDateTime: arrivalDate,
          };
          this.calendarService.addEventToCalendar(departureBody).subscribe({
            next: (response) => {},
            error: (err) => {
              const errorMessage =
                'Error in adding the event: ' + err?.error?.error?.message;
              reject(new Error(errorMessage));
            },
          });

          this.calendarService.addEventToCalendar(arrivalBody).subscribe({
            next: (response) => {
              responseToBot +=
                'The flight ' +
                flightNumber +
                ' was added to your calendar! <br> <br>';
              resolve(responseToBot);
            },
            error: (err) => {
              const errorMessage =
                'Error in adding the event: ' + err?.error?.error?.message;
              reject(new Error(errorMessage));
            },
          });
        },
        error: (err) => {
          const errorMessage =
            'There are no flights with the number ' + flightNumber + '!';
          reject(new Error(errorMessage));
        },
      });
    });
  }
}
