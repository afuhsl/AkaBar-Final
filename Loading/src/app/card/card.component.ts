import { Component, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  nombre: string ='';
  email: string='';
  opinion: string='';

  @Output() enviarDatos = new EventEmitter<{ nombre: string, email: string, opinion: string }>();
  
  constructor(private messageService: MessageService){}


  onSubmit() {
    this.enviarDatos.emit({ nombre: this.nombre, email: this.email, opinion: this.opinion });
    this.nombre = '';
    this.email = '';
    this.opinion = '';
  }
}
