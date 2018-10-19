import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class PeticionesService{
	public url:string;
	constructor(private _http:Http){
		
	}

	getTipo1(url){
		this.url='https://query.wikidata.org/sparql?query=';
		this.url+=url;
		console.log(this.url);
		return this._http.get(this.url).map(res=>res.json());
	}
}