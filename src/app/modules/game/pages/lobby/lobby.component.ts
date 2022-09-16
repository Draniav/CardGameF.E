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




  goHome() {
    this.router.navigate(['game/home/']);
  }

  goLobby() {
    this.router.navigate(['game/lobby/']);
  }


  iniciar(gameId: string) {
    this.ws$.connect(gameId).subscribe({

      next: (event:any) => {


        if(event.type === 'cardgame.tablerocreado'){
          this.gameService$.createRound({
            juegoId: gameId,
            tiempo: 80,
            jugadores:
              event.jugadorIds.map
              ((it:any) => it.uuid)
          });
        }

        if(event.type == 'cardgame.rondacreada'){
          this.router.navigate([`game/board/${gameId}`]);
        }
      },
      error: (err:any) => console.log(err),
      complete: () => console.log('complete')
    });
    this.gameService$.startGame({ juegoId: gameId }).subscribe();
  }


}
