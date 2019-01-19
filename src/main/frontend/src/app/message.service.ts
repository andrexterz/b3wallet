import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: Message = new Message();
  counter: number = 1;

  constructor() {
  }

  showAlert():void {
    const i = this.counter++;
    this.message.title = ("title message attribute: " + i);
    this.message.text = ("text message attribute: " + i);
    this.message.status = "info";
  }

  getMessage(): Message {
    return this.message;
  }

  setMessage(message: Message): void {
    this.message = message;
  }
}
