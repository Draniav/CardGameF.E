import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Routers
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './modules/game/pages/tablero/tablero.component';
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { LoginComponent } from './modules/game/pages/login/login.component';
import { ScoreComponent } from './modules/game/pages/score/score.component';

//Firestore
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    NewGameComponent,
    LoginComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
