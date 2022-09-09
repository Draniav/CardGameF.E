import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/websocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
private socket!:WebSocketSubject<unknown>;

  constructor() { }

  connect(idGame: string) {
    this.socket= webSocket(`ws://localhost:8081/retrieve/${idGame}`)
    return this.socket;

  }
  close() {
    this.socket.unsubscribe();
  }
}
