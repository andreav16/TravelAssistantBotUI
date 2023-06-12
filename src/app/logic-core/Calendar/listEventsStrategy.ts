import { Strategy } from 'src/app/interfaces/strategy';
import { EventDetails } from 'src/app/models/CalendarModels/eventDetails';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { InterpreterService } from 'src/app/services/interpreter.service';

export class ListEventsStrategy implements Strategy {
  constructor(private interpreterService: InterpreterService) {}

  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = 'Here are your calendar events:<br>';
      let eventsList: EventDetails[] = [];
      this.interpreterService.listEventsFromCalendar().subscribe({
        next: (data: EventDetails[]) => {
          eventsList = data;
          eventsList.forEach((event: EventDetails) => {
            responseToBot +=
              'Activity: ' +
              event.summary +
              '<br> Date info: ' +
              event.start.dateTime +
              ' - ' +
              event.end.dateTime +
              '<br>';
          });
          resolve(responseToBot);
        },
        error: (err) => {
          responseToBot = 'Error: ' + err;
          reject(err);
        },
      });
    });
  }
  
}
