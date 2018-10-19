import {Component} from '@angular/core';
import {LocationService} from '../services/location.sercive';

@Component({
	selector:'quiz',
	templateUrl:'./quiz.component.html',
	styleUrls:['./quiz.component.css']

})

export class QuizComponent{
	public titulo = "quiz";

	public ubicacion_actual;
	constructor(){}
	ngOnInit(){

		console.log("Se ha cargado quiz");

		
	}


}
