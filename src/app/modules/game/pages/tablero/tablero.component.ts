import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {GameService} from "../../services/game/game-service.service";
import {PlayerService} from "../../services/player/player.service";
import {Deck} from "../../models/deck.model";
import {AllBoard, Round} from "../../models/board.model";


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
  isMainPlayer: boolean = false;


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

    this.websocketService.connect(this.gameId).subscribe((res) => {
      console.log(res);
    });
     this.getDeckPlayer();
    this.getBoardId();
    console.log(this.gameId);
    console.log(this.userId);
  }

  getDeckPlayer() {
    this.gameServices.getDeckByPlayer(this.gameId).subscribe({

      next: (res) => {
        this.deck = res;
        console.log(this.deck);
      },
    });
  }

  getBoardId() {
    this.gameServices.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
          // console.log(res);
          //  this.isMainPlayer = res.jugadorPrincipalId == this.userId;
          this.boardInfo = res;
           console.log(this.boardInfo);
          //console.log(res);
        } else {
          // this.sweetAlertService.errorMessage('Board not found!');
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
}
