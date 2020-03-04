import { Component, OnInit, Input } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { Inventary } from '../../interfaces/inventoy.interface';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public url: string;
  public inventorys: Inventary[];

  constructor(private inventoryService: InventarioService) { 
    this.url = "http://localhost:3000/image/inventory/";
  }

  ngOnInit() {

    this.llamar();
  }


  llamar() {
    this.inventoryService.getInventorys().subscribe((resp: any) => {
      this.inventorys = resp.inventaios;
    },
    err => {
      console.log(err);
    });
  }

  actualizar() {
    this.llamar();
  }

}
