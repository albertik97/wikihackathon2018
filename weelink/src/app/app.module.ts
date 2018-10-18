import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import  { HomeComponent } from '../home/home.component';
import  { QuizComponent } from '../quiz/quiz.component';
import  { PreguntaComponent } from '../pregunta/pregunta.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    PreguntaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
