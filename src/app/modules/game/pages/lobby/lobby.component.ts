import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GameDataModel} from "../../models/gameModel.models";
import {GameService} from "../../services/game/game-service.service";

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
  ) { }

  ngOnInit(): void {
    this.gameService$.getGames();
    {

    };
  }

  goToGame(idGame: string): void {
    this.router.navigate(['/board/{{idGame}}'])
      .then(r => console.log(r));
  }

  getHostingName(dataGame: GameDataModel) {
    return dataGame.players[dataGame["uid"]].name;
  }

  board() {
    this.router.navigate(['/board'])
  }

  sendForm() {
    console.log(this.form)
  }
}
