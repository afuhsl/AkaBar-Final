import { Component, OnInit } from '@angular/core';
import { TablaService } from '../tabla.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  lista: any[] = [];  

  constructor( private tablaservice: TablaService){}
  
  ngOnInit(): void {
    this.lista = this.tablaservice.getLista();
  }

 
}
