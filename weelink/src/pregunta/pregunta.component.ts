import {Component} from '@angular/core';
import {PeticionesService} from '../services/peticiones.service';


@Component({
	selector:'pregunta',
	templateUrl:'./pregunta.component.html',
	styleUrls:['./pregunta.component.css'],
	providers: [PeticionesService]

})

export class PreguntaComponent{
	public categorias = [
		"¿En que lugar se encuentra este monumento?",
		"¿A qué municipio pertenece este escudo?",
		"¿A qué municipio pertenece esta bandera?",
		"¿Dónde está hecha esta foto?",
		"¿Qué municipio se encuentra en este lugar?",
		"¿Cuantos habitantes tiene..."

	];
	public categoriaSelected;
	public pregunta = "quiz";
	public correcta = "";
	public acertada:string;
	public url_imagen;
	public p1;
	public n1;
	public p1_color;
	public p2_color;
	public p3_color;
	public p4_color;
	public p2;
	public n2;
	public p3;
	public n3;
	public p4;
	public n4;
	public puntuacion;
	public number;
	public urlShow;
	public urlCategoria0; //monumentos
	public urlCategoria1; //escudos
	public urlCategoria2; //banderas
	public urlCategoria3; //foto del poble
	public urlCategoria4;


	constructor(private _PeticionesService:PeticionesService){
		this.url_imagen="";
	}
	ngOnInit(){
		this.vida=3;
		this.p1_color="white";
		this.p2_color="white";
		this.p3_color="white";
		this.p4_color="white";
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
 		this.p1_color="white";
		this.p2_color="white";
		this.p3_color="white";
		this.p4_color="white";
	if(this.categoriaSelected==0){
		this.urlShow = this.urlCategoria0;
	}
	else if(this.categoriaSelected==1){
		this.urlShow = this.urlCategoria1;
	}
	else if(this.categoriaSelected==2){
		this.urlShow = this.urlCategoria2;
	}
	else if(this.categoriaSelected==3){
		this.urlShow = this.urlCategoria3;
	}
	else if(this.categoriaSelected==4){
		this.urlShow = this.urlCategoria4;
	}

 	this._PeticionesService.getTipo1(this.urlShow).subscribe(
            result => {

                if(result.code != 200){
                    
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

	comprobar(numb,n){
		this.comprobar2(numb,n);
		if(numb==this.number){
			this.puntuacion+=100;
			this.acertada="1";
		}else{
			this.vida-=1;
			this.acertada="2";
			if(this.vida==0)
				window.location.href = '/home';
		}
			this.contestada=true;
			this.categoriaRandom();
			console.log(this.categoriaSelected);
			this.dothings();
			this.number=-1;
	}

	sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

	comprobar2(n,num){
		console.log(n);
		console.log(num);
		if(n==this.number&&num==1){
			this.p1_color='green';
			
		}else{
			this.p1_color='red';
			console.log(this.p1_color);
		}

		if(n==this.number&&num==2){
			this.p2_color='green';
			
		}else{
			this.p2_color='red';
		}

		if(n==this.number&&num==3){
			this.p3_color='green';
			
		}else{
			this.p3_color='red';
		}

		if(n==this.number&&num==4){
			this.p4_color='green';
			
		}else{
			this.p4_color='red';
		}
			
	}

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	categoriaRandom()
	{
		this.categoriaSelected = this.getRandomInt(0, 4);
	}

}
