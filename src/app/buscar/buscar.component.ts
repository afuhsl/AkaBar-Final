import { Component, Output, EventEmitter } from '@angular/core';
import { BebidasService } from '../bebidas.service';

import {  Router } from '@angular/router';
import { IBebida } from './bebida';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  @Output() buscar = new EventEmitter<string>();
  Bebida: string = "";

  menu: IBebida [] = [];

  constructor(private bebidasService: BebidasService, private route: Router){};

  enviar(): void{
    const urapi =  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.Bebida}`;
    this.bebidasService.setRecetas(urapi);
    this.route.navigate(['bebidas']);
  }
}
/*import { Component, Output, EventEmitter } from '@angular/core';
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
}*/