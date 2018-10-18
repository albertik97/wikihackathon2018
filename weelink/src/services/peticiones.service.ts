import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class PeticionesService{
	public url:string;
	constructor(private _http:Http){
		this.url='https://query.wikidata.org/sparql?query= ';
		var url2 =`SELECT DISTINCT ?mon ?monLabel ?esta_enLabel ?foto WHERE {
					 ?mon wdt:P131* wd:Q54936.
					 ?mon wdt:P31 wd:Q4989906.
					 SERVICE wikibase:label { bd:serviceParam wikibase:language "es,ca,en". }
					?mon wdt:P131 ?esta_en.
					 ?mon wdt:P18 ?foto.

					}
					LIMIT 1000`;
		this.url+=url2;
	}

	getTipo1(){
		
		return this._http.get(this.url).map(res=>res.json());
	}
}