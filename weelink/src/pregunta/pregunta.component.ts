import {Component} from '@angular/core';


@Component({
	selector:'pregunta',
	templateUrl:'./pregunta.component.html',
	styleUrls:['./pregunta.component.css']
	
})

export class PreguntaComponent{
	public pregunta = "quiz";
	public correcta = "";
	public contestada = false;

	constructor(){}
	ngOnInit(){
	
	}

}