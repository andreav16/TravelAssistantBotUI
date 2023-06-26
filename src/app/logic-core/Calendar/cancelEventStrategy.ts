import { Strategy } from 'src/app/interfaces/strategy';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { CalendarService } from 'src/app/services/calendar.service';

export class CancelEventStrategy implements Strategy {
  constructor(private calendarService: CalendarService) {}
  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = '';
      this.calendarService
        .cancelEventsFromCalendar(entities[0].text)
        .subscribe({
          next: () => {
            responseToBot = 'Event "' + entities[0].text + '" cancelled!';
            resolve(responseToBot);
          },
          error: (err) => {
            const errorMessage =
              'Error in canceling the event: ' + err?.error?.message || '';
            reject(new Error(errorMessage));
          },
        });
    });
  }
}
