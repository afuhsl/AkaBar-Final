import { Component } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  constructor(){}

  submit(){
    Notiflix.Loading.standard("Cargando...");
    //Verificar si contacto funciona
    Notiflix.Loading.remove();
    Notiflix.Notify.success("Muchas gracias por los comentarios");
  }
}
