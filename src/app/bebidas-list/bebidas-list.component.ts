import { Component, OnInit } from '@angular/core';
import { BebidasService } from '../bebidas.service';

@Component({
  selector: 'app-bebidas-list',
  templateUrl: './bebidas-list.component.html',
  styleUrls: ['./bebidas-list.component.css']
})
export class BebidasListComponent{

  constructor(public bebidasService: BebidasService){};

  
}
