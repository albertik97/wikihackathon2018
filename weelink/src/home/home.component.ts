import {Component} from '@angular/core';
import {LocationService} from '../services/location.sercive';

@Component({
	selector:'home',
	templateUrl:'./home.component.html',
	providers: [LocationService]
})

export class HomeComponent{
	public titulo = "Home";
	public ubicacion_actual="Loading...";


	constructor(
		){}
	ngOnInit(){
		//console.log();
		//this._locationService.geolocalizar();
	}
}