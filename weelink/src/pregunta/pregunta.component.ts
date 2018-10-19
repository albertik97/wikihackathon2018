import {Component} from '@angular/core';
import {PeticionesService} from '../services/peticiones.service';

@Component({
	selector:'pregunta',
	templateUrl:'./pregunta.component.html',
	styleUrls:['./pregunta.component.css'],
	providers: [PeticionesService]
	
})

export class PreguntaComponent{
	public pregunta = "quiz";
	public correcta = "";
	public contestada:boolean;
	public url_imagen;
	public p1;
	public n1;
	public p2;
	public n2;
	public p3;
	public n3;
	public p4;
	public n4;
	public puntuacion;
	public number;
	public urlCategoria1; //monumentos

	constructor(private _PeticionesService:PeticionesService){
		this.url_imagen="";
	}
	ngOnInit(){
		
		this.number=-1;
		this.puntuacion=0;
		this.contestada=false;
		this.urlCategoria1=`SELECT DISTINCT ?mon ?monLabel ?esta_enLabel ?foto WHERE {
					 ?mon wdt:P131* wd:Q54936.
					 ?mon wdt:P31 wd:Q4989906.
					 SERVICE wikibase:label { bd:serviceParam wikibase:language "es,ca,en". }
					?mon wdt:P131 ?esta_en.
					 ?mon wdt:P18 ?foto.

					}
					LIMIT 1000`;
		this.dothings();
	}

 dothings(){

 	this._PeticionesService.getTipo1(this.urlCategoria1).subscribe(
            result => {
                 
                if(result.code != 200){
                    console.log(result.results.bindings);
                    var sitios = [];
                    this.number = 0;
                    this.number = Math.floor((Math.random() * result.results.bindings.length) + 1);
				    sitios.push(this.number);
				    var number2 = Math.floor((Math.random() * result.results.bindings.length) + 1);
				    sitios.push(number2);
				    var number3 = Math.floor((Math.random() * result.results.bindings.length) + 1);
				    sitios.push(number3);
				    var number4 = Math.floor((Math.random() * result.results.bindings.length) + 1);
				    sitios.push(number4);
				    console.log(result.results.bindings[this.number]);
				    this.url_imagen=result.results.bindings[this.number].foto.value;
					sitios = this.shuffle(sitios);
				    this.p1=result.results.bindings[sitios[0]].monLabel.value;
				    this.n1=sitios[0];
				    this.p2=result.results.bindings[sitios[1]].monLabel.value;
				    this.n2=sitios[1];
				    this.p3=result.results.bindings[sitios[2]].monLabel.value;
				    this.n3=sitios[2];
				    this.p4=result.results.bindings[sitios[3]].monLabel.value;
				    this.n4=sitios[3];

                }else{
                    console.log(result.results.bindings);
                }
 
            },
            error => {
                console.log(<any>error);
            }
        );
      
	}

	shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	comprobar(numb){
		console.log(this.number);
		if(numb==this.number){
			this.puntuacion+=100;
			this.contestada=true;
			this.dothings();
			this.contestada=false;
			this.number=-1;
		}else{
			this.puntuacion-=11;
		}
	}

}