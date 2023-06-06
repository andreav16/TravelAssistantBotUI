import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box-bot',
  templateUrl: './chat-box-bot.component.html',
  styleUrls: ['./chat-box-bot.component.css']
})
export class ChatBoxBotComponent implements OnInit {

@Input() response?: string;

ngOnInit(): void {
}
}
