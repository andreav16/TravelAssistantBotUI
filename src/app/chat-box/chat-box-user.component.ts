import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InterpreterService } from '../services/interpreter.service';
import { EventType } from '../models/InterpreterModels/eventType';
import { Context } from '../logic-core/context';
import { AddEventStrategy } from '../logic-core/Calendar/addEventStrategy';
import { ListEventsStrategy } from '../logic-core/Calendar/listEventsStrategy';
import { CancelEventStrategy } from '../logic-core/Calendar/cancelEventStrategy';
import { LookUpPlacesStrategy } from '../logic-core/Places/LookPlacesStrategy';
import { FlightStatusStrategy } from '../logic-core/Flights/FlightStatusStrategy';

@Component({
  selector: 'app-chat-box-user',
  templateUrl: './chat-box-user.component.html',
  styleUrls: ['./chat-box-user.component.css'],
})
export class ChatBoxUserComponent implements OnChanges {
  @Input() userText?: string;
  received!: EventType;
  text?: string;
  responseToBot?: string;

  constructor(private interpreterService: InterpreterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userText'] && !this.isUserTextEmpty()) {
      const context = new Context();
      this.text = this.userText;
      if (this.text) {
        this.interpreterService.getEventType(this.text).subscribe({
          next: (data: EventType) => {
            this.received = data;
            if (this.received.action === 'ScheduleEvent') {
              context.setStrategy(
                new AddEventStrategy(this.interpreterService)
              );
            } else if (this.received.action === 'ListEvents') {
              context.setStrategy(
                new ListEventsStrategy(this.interpreterService)
              );
            } else if (this.received.action === 'CancelEvents') {
              context.setStrategy(
                new CancelEventStrategy(this.interpreterService)
              );
            } else if (this.received.action === 'LookUpPlaces') {
              context.setStrategy(
                new LookUpPlacesStrategy(this.interpreterService)
              );
            }else if (this.received.action === 'FlightCodeStatus') {
              context.setStrategy(
                new FlightStatusStrategy(this.interpreterService)
              );
            }
            else if (this.received.action === 'None') {
              this.responseToBot = 'Sorry, I did not understand that';
            }

            //Execute strategy
            context
              .executeStrategy(this.received.entities)
              .then((response: string) => {
                this.responseToBot = response;
              })
              .catch((error: any) => this.responseToBot = 'Sorry, there is an error in your request');
          },
          error: (err) => this.responseToBot = err.error.message,
        });
      }
    }
  }

  isUserTextEmpty(): boolean {
    return !this.userText || this.userText.trim().length === 0;
  }
}
