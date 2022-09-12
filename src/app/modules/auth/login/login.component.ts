import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { AuthService } from '../../game/services/auth/auth.service';
import { PlayerService } from '../../game/services/player/player.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
   // this.playerService.addUser({
    //  uid: '',
    //  email: 'prueba@test.com',
    //  displayName: 'Alex2',
     // photoURL: '<profilePicture2>',
  //  });
  }

  login() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/game/new']))

  }
}
