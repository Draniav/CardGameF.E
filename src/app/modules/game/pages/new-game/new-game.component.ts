import {Component, OnInit} from '@angular/core';
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
import {UserGoogle} from '../../models/user-google.models';
import {WebsocketService} from '../../services/websocket/websocket.service';


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  players: UserGoogle[] | undefined;
  form = new FormGroup({});
  WebsocketService: any;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router,
    private client: WebsocketService
  ) {
    this.players = [];
    this.form = this.createForm();
  }

  ngOnInit(): void {

      this.playerService.listar().subscribe({
      next: (res) => this.players = res,
      error: (err) => console.log(err)

    })

    //  this.WebsocketService.connect('123').subscribe({
    //    next: (data: any) => console.log(data),
    //   error: (err: any) => console.log(err),
    //    complete: () => console.log('complete()'),
    // });

  }

  private createForm(): FormGroup {
    return new FormGroup({
      players: new FormControl('', [Validators.required, this.Playersrequired]),
    });
  }

  private Playersrequired(control: AbstractControl): ValidationErrors | null {
    return control.value.length < 2
      ? {minRequired: 'You  must select at least 2 players'}
      : null;
  }

  sendForm(): void {
    console.log(this.form);
  }


  logOut(): void {
    this.authService.logOut().then(() => this.router.navigate(['login']));
  }

  lobby() {
    this.router.navigate(['/game/lobby']);
  }

  submit() {
    this.playerService
      .createGame(   {
        "juegoId": "34455",
        "jugadores": {
          "uid:002": "omar",
          "uid:001": "martin",
          "uid:003": "camilo"
        },
        "jugadorPrincipalId": "uid:003"
      })
      .subscribe((suscribe) => {
        console.log("uego creado");
      });
  }


}
