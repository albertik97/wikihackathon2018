import {Injectable} from '@angular/core';



@Injectable()


export class LocationService{
	public ubicacion_actual;
	
	getUbicacion(){
		return this.ubicacion_actual;	
	}

	setUbicacion(ubi){
		this.ubicacion_actual=ubi;
	}

}