import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-model-img',
  templateUrl: './model-img.component.html',
  styleUrls: ['./model-img.component.scss']
})
export class ModelImgComponent implements OnInit {

  @Input() img;
  @Input() name;
  nameId: number;

  constructor() { 
    this.nameId = new Date().getMilliseconds();
  }

  ngOnInit() {
  }

}
