import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-box-user',
  templateUrl: './chat-box-user.component.html',
  styleUrls: ['./chat-box-user.component.css']
})
export class ChatBoxUserComponent {
  @Input() userText ?: string;
}
