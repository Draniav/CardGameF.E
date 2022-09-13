import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {PlayerModel} from "../../models/playerModel";
import {GameDataModel} from "../../models/gameModel.models";


import {GameService} from "../../services/game/game-service.service";
import {WebsocketService} from "../../services/websocket/websocket.service";


@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  dataGames: any;
  form: any;

  constructor(
    private router: Router,
    private gameService$: GameService,
    private ws$: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.ws$.getGames().subscribe({
      next: (response) => {
        this.dataGames = response;
        console.log(response);
      },

      error: (error) => console.log(error)
    });

  }

  goToGame(idGame: string): void {
    this.router.navigate(['/board/']);

  }


  board() {
    this.router.navigate(['/board'])
  }


}
