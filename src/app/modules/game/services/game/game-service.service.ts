import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameModel} from "../../models/gameModel.models";
import {Deck} from "../../models/deck.model";
import {AllBoard, Board} from "../../models/board.model";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly URL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private auth: AuthService) {
  }


  createGame(body: any): Observable<object> {
    return this.httpClient.post(`${this.URL}/juego/crear/`, body);
  }

  getGames(): Observable<GameModel[]> {
    return this.httpClient.get<GameModel[]>(`${this.URL}/juego/listar/${this.auth.getMyUser()?.uid}`);
  }

  startGame(body: any) {
    return this.httpClient.post(`${this.URL}/juego/iniciar`, body);
  }

  getDeckByPlayer(playerId: string, gameId: string): Observable<Deck> {
    return this.httpClient.get<Deck>(`${this.URL}/mazo/${playerId}/${gameId}`);
  }

  getBoard(gameId: string): Observable<AllBoard> {
    return this.httpClient.get<AllBoard>(`${this.URL}/juego/${gameId}`)
  }


}
