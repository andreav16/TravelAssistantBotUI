import { Strategy } from 'src/app/interfaces/strategy';
import { EventDetails } from 'src/app/models/CalendarModels/eventDetails';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { CalendarService } from 'src/app/services/calendar.service';

export class ListEventsStrategy implements Strategy {
  constructor(private calendarService: CalendarService) {}

  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = 'Here are your calendar events:<br>';
      let eventsList: EventDetails[] = [];
      this.calendarService.listEventsFromCalendar().subscribe({
        next: (data: EventDetails[]) => {
          eventsList = data;
          eventsList.forEach((event: EventDetails) => {
            responseToBot +=
              'Activity: ' +
              event.summary +
              '<br> Start datetime: ' +
              event.start.dateTime +
              ' - End datetime: ' +
              event.end.dateTime +
              '<br>';
          });
          resolve(responseToBot);
        },
        error: (err) => {
          const errorMessage =
            'Could not list the events: ' + err?.error?.message || '';
          reject(new Error(errorMessage));
        },
      });
    });
  }
  
}
