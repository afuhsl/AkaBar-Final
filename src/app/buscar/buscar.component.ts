import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  @Output() buscar = new EventEmitter<string>();

}