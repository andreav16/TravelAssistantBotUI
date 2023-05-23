import { Component } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  transcribedText: string = '';
  recognition: any;
  isRecording: boolean = false;

  ngOnInit() {
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.transcribedText = transcript;
    };

  }

  toggleRecording() {
    if (this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    } else {
      this.recognition.start();
      this.isRecording = true;
    }
  }
  }


