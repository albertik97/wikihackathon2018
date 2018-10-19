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
		"¿Cuantos habitantes tiene...",
		"¿Cual de los siguientes fue..."

	];
	public yourplace = '';
	public categoriaSelected;
	public pregunta = "quiz";
	public correcta = "";
	public acertada:string;
	public url_imagen;
	public p1;
	public texto_nombre_poble;
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
	public urlCategoria4; //ubicacion en el mapa
	public urlCategoria5; //habitantes
	public urlCategoria6; //famous people
	public contestada;
	public vida;


	constructor(private _PeticionesService:PeticionesService){
		this.url_imagen="";
	}
	ngOnInit(){
		if(document.getElementById("trampa").innerHTML == "Comunidad Valenciana"){
			this.yourplace = 'Q54936';
		}
		if(document.getElementById("trampa").innerHTML == "Castilla y León"){
			this.yourplace = 'Q55269';
		}
		if(document.getElementById("trampa").innerHTML == "Andalucía"){
			this.yourplace = 'Q95088';
		}


		this.categoriaRandom();
		this.vida=10;
		this.p1_color="white";
		this.p2_color="white";
		this.p3_color="white";
		this.p4_color="white";
		this.number=-1;
		this.puntuacion=0;
		this.contestada=false;
		this.urlCategoria0=`SELECT DISTINCT ?mon ?monLabel ?esta_enLabel ?foto WHERE {
					 ?mon wdt:P131* wd:`+this.yourplace+`.
					 ?mon wdt:P31 wd:Q4989906.
					 SERVICE wikibase:label { bd:serviceParam wikibase:language "es,ca,en". }
					?mon wdt:P131 ?esta_en.
					 ?mon wdt:P18 ?foto.

					}
					LIMIT 1000`;
		this.urlCategoria1=`
			SELECT DISTINCT ?mon ?monLabel ?coordenadas ?foto WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en, es, ca". }
			?mon wdt:P131* wd:`+this.yourplace+`.
			?mon wdt:P31 ?tipoDeNucleo.
			FILTER(?tipoDeNucleo = wd:Q2074737 || ?tipoDeNucleo = wd:Q515)
			OPTIONAL { ?mon wdt:P625 ?coordenadas. }
			?mon wdt:P94 ?foto.
			}
			LIMIT 1000`;
		this.urlCategoria2=`
		SELECT DISTINCT ?mon ?monLabel ?coordenadas ?foto WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en, es, ca". }
			?mon wdt:P131* wd:`+this.yourplace+`.
			?mon wdt:P31 ?tipoDeNucleo.
			FILTER(?tipoDeNucleo = wd:Q2074737 || ?tipoDeNucleo = wd:Q515)
			OPTIONAL { ?mon wdt:P625 ?coordenadas. }
			?mon wdt:P41 ?foto.
			}
			LIMIT 1000
		`;
		this.urlCategoria3=`
			SELECT DISTINCT ?mon ?monLabel ?coordenadas ?foto WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en, es, ca". }
			?mon wdt:P131* wd:`+this.yourplace+`.
			?mon wdt:P31 ?tipoDeNucleo.
			FILTER(?tipoDeNucleo = wd:Q2074737 || ?tipoDeNucleo = wd:Q515)
			OPTIONAL { ?mon wdt:P625 ?coordenadas. }
			?mon wdt:P18 ?foto.
			}
			LIMIT 1000
		`;
		this.urlCategoria4=`
			SELECT DISTINCT ?mon ?monLabel ?coordenadas ?foto WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en, es, ca". }
			?mon wdt:P131* wd:`+this.yourplace+`.
			?mon wdt:P31 ?tipoDeNucleo.
			FILTER(?tipoDeNucleo = wd:Q2074737 || ?tipoDeNucleo = wd:Q515)
			OPTIONAL { ?mon wdt:P625 ?coordenadas. }
			?mon wdt:P242 ?foto.
			}
			LIMIT 1000
		`;
		this.urlCategoria5=`
			SELECT DISTINCT ?poble ?pobleLabel ?coordenadas ?monLabel WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en, es, ca". }
			?poble wdt:P131* wd:`+this.yourplace+`.
			?poble wdt:P31 ?tipoDeNucleo.
			FILTER(?tipoDeNucleo = wd:Q2074737 || ?tipoDeNucleo = wd:Q515)
			OPTIONAL { ?poble wdt:P625 ?coordenadas. }
			?poble wdt:P1082 ?monLabel.
			}
			LIMIT 1000
		`;
		this.urlCategoria6=`
			SELECT ?mon ?monLabel ?pobleLabel WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "es, en". }
			?mon (wdt:P19/wdt:P131) wd:`+this.yourplace+`.
			?mon ?trabajo ?poble.
			FILTER((?trabajo = wdt:P106) || (?trabajo = wdt:P39))
			}
			LIMIT 1000
		`;

		this.dothings();

	}

 dothings(){
 		this.number=-1;
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
		else if(this.categoriaSelected==5){
			this.urlShow = this.urlCategoria5;
		}
		else if(this.categoriaSelected==6){
			this.urlShow = this.urlCategoria6;
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

					if(this.categoriaSelected<5){
											this.url_imagen=result.results.bindings[this.number].foto.value;
											this.texto_nombre_poble='';
										}
										else{
											this.url_imagen='';
											this.texto_nombre_poble=result.results.bindings[this.number].pobleLabel.value+'?';
										}					sitios = this.shuffle(sitios);
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
		this.comprobar2();
		if(numb==this.number){
			this.puntuacion+=100;
			this.acertada="1";

			console.log(this.categoriaSelected);
		}else{
			this.vida-=1;
			this.acertada="2";

			if(this.vida==0)
				window.location.href = '/home';
		}
			this.contestada=true;
			this.categoriaRandom();
			console.log(this.categoriaSelected);
			setTimeout(()=>{
				this.dothings();},2000);



	}

	comprobar2(){

		if(this.n1==this.number){
			this.p1_color='#00C853';

		}else{
			this.p1_color='#FF8A80';
			console.log(this.p1_color);
		}

		if(this.n2==this.number){
			this.p2_color='#00C853';

		}else{
			this.p2_color='#FF8A80';
		}

		if(this.n3==this.number){
			this.p3_color='#00C853';

		}else{
			this.p3_color='#FF8A80';
		}

		if(this.n4==this.number){
			this.p4_color='#00C853';

		}else{
			this.p4_color='#FF8A80';
		}

	}

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	categoriaRandom()
	{
		this.categoriaSelected = this.getRandomInt(0, 6);
	}

}
