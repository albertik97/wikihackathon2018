import {Component} from '@angular/core';
import {LocationService} from '../services/location.sercive';

@Component({
	selector:'quiz',
	templateUrl:'./quiz.component.html',
	styleUrls:['./quiz.component.css']
	
})

export class QuizComponent{
	public titulo = "quiz";
	public categorias = [
		"¿En que lugar se encuentra este monumento ",
		"¿Cuantos habitantes tiene",
		"¿Cúal es la profesión de",
		"¿Dónde nacio"
	];
	public categoriaSelected;
	public ubicacion_actual;
	constructor(){}
	ngOnInit(){

		console.log("Se ha cargado quiz");
		this.categoriaRandom();
		console.log("Ha tocado como categoria: " + this.categorias[this.categoriaSelected]);
	}

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	categoriaRandom()
	{
		this.categoriaSelected = this.getRandomInt(0, 3);
	}
}