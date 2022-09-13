import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GameModel} from "../../models/gameModel.models";




@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly URL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }


  createGame(body: any):Observable<object> {
    return this.httpClient.post(`${this.URL}/juego/crear/`, body);
  }
  getGames(uid: string): Observable<GameModel[]> {
    return this.httpClient.get<GameModel[]>(`${this.URL}/juegos/listar/${uid}`);
  }
}
