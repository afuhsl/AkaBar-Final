import { Component, Input } from '@angular/core';
import {PromocionesService, Promo} from '../shared/promociones.service';
import { MessageService } from 'primeng/api';
import { Auth, user } from '@angular/fire/auth';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  promociones:Promo[];
  index:number=-1;
  datos!: Promo;
  mensaje:string="";
  visible:boolean =false;
  usuario=false;
  admin =false;
  usuarioAutenticado: boolean = false;

  @Input() busqueda: string = '';

  constructor(
    public servicio: PromocionesService, 
    private messageService: MessageService,
    private auth: Auth,
    private ss : FirebaseService,
    private ruta: Router) {
    this.promociones=this.servicio.getPromociones();
    console.log(this.promociones);

    this.auth.onAuthStateChanged((user) =>{
      if(user){
        this.usuarioAutenticado=true;
        const userId = user.uid;
        if(userId == '1CMjiHE3XrOhVud6qvWFErVAvrK2'){
          this.admin=true;
          this.usuario=false;
        }else{
          this.admin=false;
          this.usuario=true;
        }
      }else{
        this.usuarioAutenticado=false;
      }
    })
  
  }


  salir(){
    this.ss.logOut()
      .then((response) =>{
        Notiflix.Notify.success("Vuelve pronto...");
        location.reload();
        console.log(response)
        this.ruta.navigate(['/home'])
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  ngOnChanges(changes: any){
    if(changes.busqueda && changes.busqueda.currentValue){
      const aux = changes.busqueda.currentValue;
      console.log('Estoy en el metodo ver' + aux);
      this.index=this.promociones.findIndex(p => p.nombre === aux);
      console.log(this.index);
      if(this.index !== -1){
        this.datos = this.promociones[this.index]
        this.visible=true;
      }
      else{
        this.messageService.add({severity:'info', summary: 'Lo sentimos', detail: 'Este dia no contamos con promociones'});
        setTimeout(() => {
          this.mensaje="";
        }, 2000);
      }
    }
  }

  ver(aux:string){
    console.log("Estoy en el metodo ver "+aux);
    this.index = this.promociones.findIndex( p => p.nombre === aux);
    console.log(this.index);
    if(this.index !== -1){
      this.datos= this.promociones[this.index];
      //console.log(this.datos);
      this.visible=true;
    }
    else{
      this.messageService.add({ severity: 'info', summary: 'Lo sentimos', detail: 'Este dia no contamos con promociones' });
      //this.mensaje="El heroe no existe";
      //console.log(this.mensaje);
      setTimeout(() => {
        this.mensaje="";
      }, 2000);
    }
  }
}
