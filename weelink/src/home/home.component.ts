import {Component} from '@angular/core';
import {LocationService} from '../services/location.sercive';

@Component({
	selector:'home',
	templateUrl:'./home.component.html',
	providers: [LocationService]
})

export class HomeComponent{
	public titulo = "Home";

	constructor(
		private _locationService: LocationService
		){}
	ngOnInit(){
		this._locationService.geolocalizar();
	}
}