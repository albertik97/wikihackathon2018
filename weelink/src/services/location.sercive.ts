import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import  'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()


export class LocationService{
	public latitudt:number;
	public longitudt:number;
	public url:string;
	private _http:Http;

	/*geolocalizar() {
		navigator.geolocation.getCurrentPosition(

		function mostrarLoc(geo){     

		var latitud=geo.coords.latitude;
		var longitud=geo.coords.longitude;

		console.log(latitud);
		console.log(" ");
		console.log(longitud);


		},function mostrarError(error){                
			console.log(error);
		});
	}*/


}