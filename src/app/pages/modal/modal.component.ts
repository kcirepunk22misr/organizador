import { Component, OnInit, Input } from '@angular/core';
import { HerramientasService } from '../../services/herramientas.service';
import { Property } from 'src/app/interfaces/Property.interfaces';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  @Input() reportes;
  @Input() name: string;
  @Input() identificador;
  nameID: number;
  estados: Property[];
  mostrar: boolean;
  forma: FormGroup;
  dis: boolean;
  reports: any;
  formulario: NgForm;

  constructor(private herramientaService: HerramientasService, 
              private report: ReportsService) { 
    this.nameID = new Date().getMilliseconds();
    this.mostrar = false;
    this.dis = false;
  }

  ngOnInit() {
    this.getStates();
    this.getReports();
  }

  public id: string;

  getStates() {
    return this.herramientaService.getProperty('states')
        .subscribe((resp: any) => {
          this.estados = resp.states;
        });
  }

  actualizarReport() {
    this.getReports();
  }
  
  getReports() {
    this.report.getReports().subscribe((resp: any) => {
      this.reports = resp.reports;
      console.log(this.reports);
    });
  }

  save(forma: NgForm) {
    console.log(forma.value);

    let report = {
      inventoryId: forma.value.inventoryId,
      description: forma.value.description
    }

    let estado = {
      inventoryId: forma.value.inventoryId,
      state: forma.value.state
    }
    

    this.report.saveReport(report).subscribe((resp: any) => {
      console.log(resp);
    });

    this.report.actualizarEstato(estado).subscribe((resp: any) => {
      console.log(resp);
    });

  }

}
