import { Entity } from 'src/app/models/entity';
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
      let responseToBot: string = "";
      for (let i = 0; i < entities.length; i++) {
        if (entities[i].category === 'StartDate') {
          startDatetime = convertirFechaTexto(entities[i].text);
        }
        if (entities[i].category === 'EndDate') {
          endDatetime = convertirFechaTexto(entities[i].text);
          hasEndDate = true;
        }
        if (entities[i].category === 'Event') {
          eventName = entities[i].text;
        }
      }

      if (endDatetime?.length === 0) {
        endDatetime = startDatetime;
      }

      for (let i = 0; i < entities.length; i++) {
        if (entities[i].category === 'StartTime') {
          startDatetime += 'T' + convertirHoraAMPMa24(entities[i].text);
        }
        if (entities[i].category === 'EndTime') {
          endDatetime += 'T' + convertirHoraAMPMa24(entities[i].text);
          hasEndTime = true;
        }
      }
      if (!hasEndTime && !hasEndDate) {
        endDatetime = startDatetime;
      }
      const body = {
        summary: eventName,
        description: eventName,
        startDateTime: startDatetime,
        endDateTime: endDatetime,
      };
      this.interpreterService.addEventToCalendar(body)
        .subscribe({
          next: (response) => {
            responseToBot = '¡Event "' + eventName + '" scheduled!';
            resolve(responseToBot); // Resolvemos la promesa con el valor responseToBot
          },
          error: (err) => {
            console.log(err);
            reject(err); // Rechazamos la promesa en caso de error
          },
        });
      console.log(responseToBot);
    });
  }
}
