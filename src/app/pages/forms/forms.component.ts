import { Component, OnInit, OnDestroy } from '@angular/core';
import { HerramientasService } from '../../services/herramientas.service';
import { Property } from 'src/app/interfaces/Property.interfaces';
import { NgForm } from '@angular/forms';
import { InventarioService } from 'src/app/services/inventario.service';
import Inv from '../../models/Inventario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  inv = {
    name: '',
    group: 'Seleciona grupo'
  }

  public url: string;
  public urlImg: string;
  public types: Property[];
  public groups: Property[];
  public marcas: Property[];
  public states: Property[];
  public ubicaciones: string[];
  public inventario: Inv;
  public filesToUpload: Array<File>;

  tipo;

  constructor(
    private herramientaService: HerramientasService,
    private inventarioService: InventarioService
    ) 
  {
    this.url = 'http://localhost:3000';
    this.urlImg = 'http://localhost:3000/inventory/image/';
    this.inventario = new Inv('','','','','',0, '');
  }


  ngOnInit() {
    this.getTypes();
    this.getGroups();
    this.getMarcas();
    this.getStates();
    this.getUbicacion();
  }

  OnDestroy() {
    
  }

  fileChangeEvent(fileInput: any ) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


  getTypes() {
    return this.herramientaService.getProperty('types')
        .subscribe((resp: any) => {
          this.types = resp.types;
        });
  }

  prueba() {
    setInterval(() => {
      console.log('bbcita');
    },1000);
  }

  getGroups() {
    this.herramientaService.getProperty('groups')
        .subscribe((resp: any) => {
          this.groups = resp.groups;
        });
  }

  getMarcas() {
        this.herramientaService.getProperty('marcas')
            .subscribe((resp: any) => {
              this.marcas = resp.marcas;
            });
  }

  getStates() {
    this.herramientaService.getProperty('states')
        .subscribe((resp: any) => {
          this.states = resp.states;
        });
  }

  getUbicacion() {
    this.herramientaService.getUbicaciones()
        .subscribe((resp: any) => {
          this.ubicaciones = resp.locacions;
        });
  }

  restar() {

    if(this.inventario.quantify === 0) {
      return;
    }

    this.inventario.quantify -= 1;
  }

  sumar() {
    this.inventario.quantify += 1;
  }


  guardar(forma:NgForm) {
    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
  
    this.inventarioService.createdInventory(this.inventario)
        .subscribe((resp: any) => {
          this.inventarioService.makeFileRequest(`${this.url}/inventory/image-upload/${resp.inventarios._id}`, [], this.filesToUpload, 'image').then((resp: any) => {
            Swal.fire(
              'Guardado Exitosamente',
              `${resp.inventarios.name} guardado`,
              'success'
            )
            forma.reset();
          });
          
        });

  }

}
