import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewGameComponent} from './modules/game/pages/new-game/new-game.component';
import {TableroComponent} from './modules/game/pages/tablero/tablero.component';
//import { LoginComponent } from './modules/auth/login/login.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {LobbyComponent} from './modules/game/pages/lobby/lobby.component';
import { HomeComponent } from './modules/game/pages/home/home.component';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'game/login',
    pathMatch: 'full',
  },

  {
    path: 'game/new',
    component: NewGameComponent,
    ...canActivate(() => redirectUnauthorizedTo(['game/login'])),
    pathMatch: 'full',
  },

  {
    path: 'game/board',
    component: TableroComponent,
    ...canActivate(() => redirectUnauthorizedTo(['game/login'])),
    pathMatch: 'full',
  },

  {
    path: 'game/lobby',
    component: LobbyComponent,
    ...canActivate(() => redirectUnauthorizedTo(['game/login'])),
    pathMatch: 'full',
  },
  {
    path: 'game/home',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['game/login'])),
    pathMatch: 'full',
  },

  //{
  //path: 'game/login',
  //   component: LoginComponent,
//    ...canActivate(() => redirectLoggedInTo(['game/new'])),
  //  pathMatch: 'full',
  //},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
