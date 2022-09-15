import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {GameService} from "../../services/game/game-service.service";
import {WebsocketService} from "../../services/websocket/websocket.service";
import {AuthService} from "../../services/auth/auth.service";


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
    private ws$: WebsocketService,
    private auths$: AuthService,

  ) {
  }

  ngOnInit(): void {
    this.gameService$.getGames().subscribe({
      next: (response) => {
        this.dataGames = response;
        console.log(response);
      },

      error: (error) => console.log(error)
    });

  }

  goToGame(idGame: string): void {
    this.router.navigate([`game/board/${idGame}`]);
   }


  goHome() {
    this.router.navigate(['game/home/']);
  }

  goLobby() {
    this.router.navigate(['game/lobby/']);
  }
}
