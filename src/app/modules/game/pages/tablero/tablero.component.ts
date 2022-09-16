import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {GameService} from "../../services/game/game-service.service";
import {PlayerService} from "../../services/player/player.service";
import {Deck} from "../../models/deck.model";
import {AllBoard, Round} from "../../models/board.model";
import {Card, Carta} from "../../models/card.model";


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
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  numeroRonda: number = 0;
  rondaIniciada: boolean = false;
  isMainPlayer: boolean = false;
  numberOfPlayers: Round | null = null;
  cardsOnBoard: Carta[] = [];
  cartasUser: Card[] = [];
  idPlayer: [] = [];
  banner = true;
  btnIniciarHabilitado: boolean = true;
  jugador!: string;
  uid!: string;
  Winner: string = "";


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
            this.cartasUser = this.cartasUser;
            this.btnIniciarHabilitado = true;
            break;

          case 'cardgame.ponercartaentablero':
            this.jugador = res.jugadorId.uuid
            this.cardsOnBoard.push({
              cartaId: res.carta.cartaId,
              poder: res.carta.poder,
              estaOculta: res.carta.estaOculta,
              estaHabilitada: res.carta.estaHabilitada,
              url: res.carta.url,
              jugador: this.jugador,
            });
            console.log("cartas en el tablero", this.cardsOnBoard)

            break;
          case 'cardgame.cartaquitadadelmazo':
            this.cartasUser = this.cartasUser
              .filter((item) => item.cartaId !== res.carta.cartaId.uuid);
            break;

          case 'cardgame.rondacreada':
            this.tiempo = res.tiempo;
            this.jugadoresRonda = res.ronda.jugadores.length
            this.numeroRonda = res.ronda.numero
            break;

          case 'cardgame.juegofinalizado':
            this.Winner = res.alias;
            alert(res.alias + "Wins the Arena!!!")
            alert("Ganador del Juego: " + this.Winner)
            setTimeout(() => {
              this.router.navigate(['juego/home']);
            }, 500);
            break
          case 'cardgame.rondaterminada':
            this.rondaIniciada = false;
            this.cardsOnBoard = [];
            break
          case 'cardgame.cartasasignadasajugador':

            console.log("ronda pura", this.numeroRonda);
            console.log("mazo jugador # 3", this.cartasUser)
            if (res.ganadorId.uuid === this.uid) {
              this.cardsOnBoard.forEach((carta: any) => {

                return this.cartasUser.push({
                  nombre: carta.nombre,
                  cartaId: carta.cartaId.uuid,
                  poder: carta.poder,
                  estaOculta: carta.estaOculta,
                  estaHabilitada: res.ganadorId.uuid === carta.jugador,
                  url: carta.url,
                 // ronda: res.ganadorId.uuid === carta.jugador ? 0 : this.numeroRonda
                });


                // if(carta.poder > this.cartaGanadora[0].poder){
                //   this.cartaGanadora[0]=carta;
                //   console.log("carta ganadora",this.cartaGanadora)
                // }

              });
              console.log("mazo jugador", this.cartasUser)

              // alert("Ganaste la ronda!")

            }
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
    this.gameServices.putCardOnBoard({
      juegoId: this.gameId,
      cartaId: cartaId,
      jugadorId: this.uid
    }).subscribe(e => console.log(e))
    console.log("ponerCarta" + cartaId);
  }
}
