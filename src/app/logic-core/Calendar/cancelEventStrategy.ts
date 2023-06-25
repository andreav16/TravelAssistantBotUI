import { Strategy } from 'src/app/interfaces/strategy';
import { Entity } from 'src/app/models/InterpreterModels/entity';
import { InterpreterService } from 'src/app/services/interpreter.service';

export class CancelEventStrategy implements Strategy {
  constructor(private interpreterService: InterpreterService) {}
  execute(entities: Entity[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let responseToBot: string = '';
      this.interpreterService
        .cancelEventsFromCalendar(entities[0].text)
        .subscribe({
          next: () => {
            responseToBot = 'Event ' + entities[0].text + ' cancelled!';
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
