import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {GameService} from "../../services/game/game-service.service";
import {PlayerService} from "../../services/player/player.service";
import {Deck} from "../../models/deck.model";
import {AllBoard, Round} from "../../models/board.model";
import {Card} from "../../models/card.model";

@Component({
  selector: 'tableroComponent',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss'],
})
export class TableroComponent implements OnInit {
  private gameId!: string;
  private userId: string;
  deck: Deck | null = null;
  boardInfo: AllBoard | null = null;
  round: Round | null = null;
  tiempo: number = 0
  isMainPlayer: boolean = false;
  numberOfPlayers: Round | null = null;
  cartasUser: Card[] = [];
  banner =true;


  constructor(
    private activatedRoute: ActivatedRoute,
    private websocketService: WebsocketService,
    private gameServices: GameService,
    private userService: PlayerService,
    private router: Router
  ) {
    this.userId = this.userService.getCurrentUser()?.uid!;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => {
          this.gameId = id;
          return this.websocketService.connect(id);
        })
      )
      .subscribe(() => {
        console.log(this.gameId);
      });

    this.websocketService.connect(this.gameId).subscribe((res: any) => {
        switch (res.type) {
          case 'cardgame.tiempocambiadodeltablero':
            this.tiempo = res.tiempo;
            break;
          case 'cardgame.rondainiciada':
            this.round = res.round.numero;
            this.numberOfPlayers = res.round.numberOfPlayers;
            console.log(res);
            break;

          default :
        }


      }
    )
    ;
    this.getDeckPlayer();
    this.getBoardId();
    console.log(this.gameId);
    console.log(this.userId);


  }

  getDeckPlayer() {
    this.gameServices.getDeckByPlayer(this.gameId).subscribe({

      next: (res) => {
        this.cartasUser = res.cartas;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  getBoardId() {
    this.gameServices.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
          this.boardInfo = res;


          console.log(this.boardInfo);
          console.log(res);


        } else {

          console.log("board not found");
          this.router.navigate(['/game/lobby']);
        }
      },
    });
  }

  initGame() {
    this.gameServices.startGame({juegoId: this.gameId}).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ponerCarta(cartaId: string) {
    console.log("ponerCarta"+ cartaId);
  }
}
