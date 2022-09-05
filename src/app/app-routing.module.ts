import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { TableroComponent } from './modules/game/pages/tablero/tablero.component';
import { LoginComponent } from './modules/game/pages/login/login.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'game/new',
    component: NewGameComponent,
    ...canActivate(() => redirectUnauthorizedTo(['game/login'])),
  },
  {
    path: 'game/tablero',
    component: TableroComponent,
  },

  {
    path: 'game/login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['game/new'])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
