import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
 datos:FormGroup; 

 constructor(private httpclient:HttpClient,
  private messageService:MessageService){
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
    this.messageService.add({ severity: 'success', summary: 'Bienvenido!!', detail: 'Bienvenido a AkaBar' });
    Notiflix.Loading.remove();
  })

  this.datos.reset();
 }
}
