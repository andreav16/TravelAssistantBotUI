import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-voice-chat-button',
  templateUrl: './voice-chat-button.component.html',
  styleUrls: ['./voice-chat-button.component.css']
})
export class VoiceChatButtonComponent {
  transcribedText: string = '';
  recognition: any;
  isRecording: boolean = false;

  constructor(private ngZone: NgZone) {
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.ngZone.run(() => {
        if (this.isRecording) {
          this.transcribedText += transcript;
        }
      });
    };

    this.recognition.onend = () => {
      if (this.isRecording) {
        this.toggleRecording();
      }
    };
  }

  toggleRecording() {
    if (this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    } else {
      this.recognition.start();
      this.isRecording = true;
      this.transcribedText = ''; // Reinicia el texto transcrito al iniciar la grabación
    }
  }
}