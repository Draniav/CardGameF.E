import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocketSubject<unknown>;

  constructor(private client: HttpClient) {}

  connect(idGame: string) {
    this.socket = webSocket(`ws://localhost:8081/retrieve/${idGame}`);
    return this.socket;
  }

  disconnect() {
    this.socket.unsubscribe();
    //  this.socket.complete();
  }

  crearjuego(body: {}) {
    return this.client.post('http://localhost:8080/juego/crear/', body);
  }
}
