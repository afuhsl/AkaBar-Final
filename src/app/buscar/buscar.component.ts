import { Component, Output, EventEmitter } from '@angular/core';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  submit(){
    Notiflix.Loading.standard("Cargando...");
    Notiflix.Loading.remove();
  }
  @Output() buscar = new EventEmitter<string>();
}