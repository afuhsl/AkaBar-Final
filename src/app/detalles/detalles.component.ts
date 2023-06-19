import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{
  cita: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    const citas = JSON.parse(localStorage.getItem('citas') ?? '[]');
    this.cita = citas.find(((cita: { nombre: string | null; }) => cita.nombre === nombre));
  }
  }


