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
    const urapi =  `http://localhost:3000/fetch_alcohol/${this.Bebida}`;
    this.bebidasService.setRecetas(urapi);
    this.route.navigate(['bebidas']);
  }
}