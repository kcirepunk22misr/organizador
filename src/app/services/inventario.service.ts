import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventary } from '../interfaces/inventoy.interface';
import Inventario from '../models/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
    return new Promise(function(resolve, reject) {

      var formData = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }

  createdInventory(inventory: Inventario) {
    return this.http.post(`${this.url}/inventory/add-inventory`, inventory);
  }

  getInventorys() {
    return this.http.get(`${this.url}/inventory/inventorys`);
  }

}
