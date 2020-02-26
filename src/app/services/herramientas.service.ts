import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../interfaces/Property.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  public url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000';
  }

  getProperty(nombre: string){ 
    return this.http.get(`${this.url}/properties/${nombre}`);
  }

  getUbicaciones() {
    return this.http.get(`${this.url}/location/locacions`);
  }

}
