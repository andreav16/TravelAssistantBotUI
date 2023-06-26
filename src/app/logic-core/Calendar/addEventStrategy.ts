import { Entity } from 'src/app/models/InterpreterModels/entity';
import { parseTextDatetoDatetime, parseTimeAMPMto24 } from './addEventUtils';
import { Strategy } from 'src/app/interfaces/strategy';
import { CalendarService } from 'src/app/services/calendar.service';

export class AddEventStrategy implements Strategy {
  constructor(private calendarService: CalendarService) {}

  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let startDatetime: string = '';
      let endDatetime: string = '';
      let eventName: string = '';
      let hasEndDate: boolean = false;
      let hasEndTime: boolean = false;
      let responseToBot: string = '';
      entities.forEach((x) => {
        if (x.category === 'Event') {
          eventName = x.text;
        }
        if (x.category === 'StartDate') {
          startDatetime = parseTextDatetoDatetime(x.text);
        }
        if (x.category === 'EndDate') {
          endDatetime = parseTextDatetoDatetime(x.text);
          hasEndDate = true;
        }
      });

      if (endDatetime?.length === 0) {
        endDatetime = startDatetime;
      }

      entities.forEach((x) => {
        if (x.category === 'StartTime') {
          startDatetime += 'T' + parseTimeAMPMto24(x.text);
        }
        if (x.category === 'EndTime') {
          endDatetime += 'T' + parseTimeAMPMto24(x.text);
          hasEndTime = true;
        }
      });

      if (!hasEndTime && !hasEndDate) {
        endDatetime = startDatetime;
      }

      const body = {
        summary: eventName,
        description: eventName,
        startDateTime: startDatetime,
        endDateTime: endDatetime,
      };

      this.calendarService.addEventToCalendar(body).subscribe({
        next: (response) => {
          responseToBot = '¡Event "' + eventName + '" scheduled!';
          resolve(responseToBot);
        },
        error: (err) => {
          const errorMessage =
            'Error in adding the event: ' + err?.error?.error?.message;
          reject(new Error(errorMessage));
        },
      });
    });
  }
}