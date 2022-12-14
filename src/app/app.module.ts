import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Routers
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './modules/game/pages/tablero/tablero.component';
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { LobbyComponent } from './modules/game/pages/lobby/lobby.component';

//Firestore
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AuthModule } from './modules/auth/auth.module';
import { HomeComponent } from './modules/game/pages/home/home.component';
import {DragDropModule} from "@angular/cdk/drag-drop";




@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    NewGameComponent,
    LobbyComponent,
    HomeComponent,

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AuthModule,
        DragDropModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
