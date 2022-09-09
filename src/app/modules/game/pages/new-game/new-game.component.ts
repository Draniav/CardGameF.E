import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../../models/playerModel';
import { PlayerService } from '../../services/player/player.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  players: PlayerModel[] | undefined;
  form = new FormGroup({});

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router
  ) {
    this.players = this.playerService.getPlayers();
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return new FormGroup({
      players: new FormControl('', [Validators.required, this.Playersrequired]),
    });
  }

  private Playersrequired(control: AbstractControl): ValidationErrors | null {
    return control.value.length < 2
      ? { minRequired: 'You  must select at least 2 players' }
      : null;
  }

  sendForm(): void {
    console.log(this.form);
  }

  logOut(): void {
    this.authService.logOut().then(() => this.router.navigate(['game/login']));
  }

  submit() {
    this.playerService
      .createGame({
        juegoId: '12345',
        jugadores: {
          'uid-001': 'camilo',
          'uid-002': 'andres',
        },
        jugadorPrincipal: 'uid-001',
      })
      .subscribe((suscribe) => {
        console.log(suscribe);
      });
  }
}
