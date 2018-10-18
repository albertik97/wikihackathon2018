import { moduleWithProviders } from '@angular/core';
import { Ŕoutes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'quiz', component: QuizComponent},
	{path: '**', component: HomeComponent},

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);