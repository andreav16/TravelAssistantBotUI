import { Entity } from 'src/app/models/InterpreterModels/entity';
import { convertirFechaTexto, convertirHoraAMPMa24 } from './addEventUtils';
import { Strategy } from 'src/app/interfaces/strategy';
import { InterpreterService } from 'src/app/services/interpreter.service';

export class AddEventStrategy implements Strategy {
  constructor(private interpreterService: InterpreterService) {}

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
          startDatetime = convertirFechaTexto(x.text);
        }
        if (x.category === 'EndDate') {
          endDatetime = convertirFechaTexto(x.text);
          hasEndDate = true;
        }
      });

      if (endDatetime?.length === 0) {
        endDatetime = startDatetime;
      }

      entities.forEach((x) => {
        if (x.category === 'StartTime') {
          startDatetime += 'T' + convertirHoraAMPMa24(x.text);
        }
        if (x.category === 'EndTime') {
          endDatetime += 'T' + convertirHoraAMPMa24(x.text);
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

      this.interpreterService.addEventToCalendar(body).subscribe({
        next: (response) => {
          responseToBot = '¡Event "' + eventName + '" scheduled!';
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