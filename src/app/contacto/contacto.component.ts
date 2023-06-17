import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
 datos:FormGroup; 

 constructor(private httpclient:HttpClient){
  this.datos = new FormGroup({
    nombre: new FormControl ('',Validators.required),
    correo: new FormControl ('',Validators.required),
    asunto: new FormControl ('',Validators.required),
    mensaje: new FormControl('',Validators.required)
  })
 }
 enviocorreo(){
  Notiflix.Loading.standard('Cargando...');

  let params = {
    email: 'reeksmoo@gmail.com',
    asunto:this.datos.value.asunto,
    mensaje:this.datos.value.mensaje
  }
  console.log(params)
  this.httpclient.post('http://localhost:3000/envio',params).subscribe(resp=>{
    console.log(resp)
    Notiflix.Loading.remove();
    Notiflix.Notify.success('Enviado Correctamente');
  })

  this.datos.reset();
 }
}
