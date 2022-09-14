import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player/player.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Player} from '../../models/user-google.models';
import {WebsocketService} from '../../services/websocket/websocket.service';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {User as CurrentUser, User} from '@angular/fire/auth';
import {GameService} from "../../services/game/game-service.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  players: Player[] = [];
  form = new FormGroup({});
  playersSubscription!: Subscription;
  uuid: string;


  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router,
    private client: WebsocketService,
    private gameService: GameService
  ) {
    this.players = [];
    this.form = this.createForm();
    this.uuid = uuidv4();
   // this.uuid = "123";
  }


  ngOnInit(): void {

    this.client.connect(this.uuid).subscribe(console.log);
    this.playerService.getAllPlayers().subscribe({
      next: (res) => this.players = res,
      error: (err) => console.log(err)
    })

  }

  private createForm(): FormGroup {
    return new FormGroup({
      players: new FormControl('', [Validators.required, this.PlayersRequired]),
    });
  }

  private PlayersRequired(control: AbstractControl): ValidationErrors | null {
    return control.value.length < 2
      ? {minRequired: 'You  must select at least 2 players'}
      : null;
  }


  logOut(): void {
    this.authService.logOut().then(() => this.router.navigate(['login']));
  }

  lobby() {
    this.router.navigate(['/game/lobby']);
  }

 async submit(data: any) {
    const {players: formPlayers} = data;
    const playersToSend = this.generatePlayersCommand(formPlayers);
    this.gameService
      .createGame({
        juegoId: this.uuid,
        jugadores: playersToSend,
        jugadorPrincipalId: formPlayers[0].uid,
      })
      .subscribe({
        next: console.log,
        error: console.error,
        complete: () => {
          this.router.navigate(['/game/lobby'], {
            queryParams: {mainPlayerId: this.uuid},
          });
        },
      });
  }


  private generatePlayersCommand(players: User[]) {
    return players.reduce((previousValue, currentValue) => {
        return {
          ...previousValue,
          [currentValue.uid]: currentValue.displayName
        };
      },
      {});
  }


  goHome() {
    this.router.navigate(['/game/home']);
  }
}
