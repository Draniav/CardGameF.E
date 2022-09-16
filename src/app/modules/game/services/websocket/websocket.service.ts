import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocketSubject<unknown>;
  private URL_WebSocket: String = "ws://localhost:8081/retrieve";
  private URL: String = "http://localhost:8080";


  constructor(private client: HttpClient) {
  }


  connect(idGame: string): WebSocketSubject<unknown> {
    this.socket = webSocket(`${this.URL_WebSocket}/${idGame}`);
    return this.socket;
  }

  disconnect() {
    this.socket.unsubscribe();
    //  this.socket.complete();
  }

  getGames(): Observable<object> {
    return this.client.get(`${this.URL}/juegos/`);
  }








}
