import {Component} from '@angular/core';

@Component({
	selector:'quiz',
	templateUrl:'./quiz.component.html',
	
})

export class QuizComponent{
	public titulo = "quiz";
	public categorias = [
		"MonumentosUbi",
		"PoblacionPueblo",
		"FamososProfesion",
		"FamososNacimiento"
	];
	public categoriaSelected;



	constructor(
		
		){}
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