import { Component, OnInit } from '@angular/core';
import { TablaService } from '../tabla.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  lista: any[] = [];  

  constructor( private tablaservice: TablaService){}
  
  ngOnInit(): void {
    Notiflix.Loading.standard("Cargando...");
    this.lista = this.tablaservice.getLista();
    Notiflix.Loading.remove();
  }

 
}
