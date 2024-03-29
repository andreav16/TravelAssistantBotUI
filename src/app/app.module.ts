import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoiceChatButtonComponent } from './voice-chat-button/voice-chat-button.component';
import { ChatBoxUserComponent } from './chat-box/chat-box-user.component';
import { ChatBoxBotComponent } from './chat-box-bot/chat-box-bot.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    VoiceChatButtonComponent,
    ChatBoxUserComponent,
    ChatBoxBotComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
