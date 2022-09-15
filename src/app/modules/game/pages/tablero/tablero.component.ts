import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {GameService} from "../../services/game/game-service.service";
import {PlayerService} from "../../services/player/player.service";
import {Deck} from "../../models/deck.model";
import {Board, AllBoard} from "../../models/board.model";


@Component({

  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss'],
})
export class TableroComponent implements OnInit {
  private gameId!: string;
  private userId: string;
  deck: Deck | null = null;
  board: Board | null = null;
  boardInfo: AllBoard | null = null;
  isMainPlayer: boolean = false;

  constructor(
    private websocketService: WebsocketService,
    private activatedRoute: ActivatedRoute,
    private gameServices: GameService,
    private userService: PlayerService,
    private router: Router
  ) {
    this.userId = this.userService.getCurrentUser()?.uid!;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.gameId = id;
          return this.websocketService.connect(id);
        })
      )
      .subscribe(() => {
        console.log(this.gameId);
      });

    this.websocketService.connect(this.gameId).subscribe((res) => {
      console.log(res);
    });
    this.getDeckPlayer();
    this.getBoardId();
  }

  getDeckPlayer() {
    this.gameServices.getDeckByPlayer(this.userId, this.gameId).subscribe({
      next: (res) => {
        this.deck = res;
      },
    });
  }

  getBoardId() {
    this.gameServices.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
        //  this.isMainPlayer = res.jugadorPrincipalId == this.userId;
         this.boardInfo = res;
          console.log(this.boardInfo);
          console.log();
        } else {
         // this.sweetAlertService.errorMessage('Board not found!');
          console.log("board not found");
          this.router.navigate(['/game/lobby']);
        }
      },
    });
  }

  initGame() {
    this.gameServices.startGame({ juegoId: this.gameId }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
