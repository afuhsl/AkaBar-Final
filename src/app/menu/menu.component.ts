import { Component, Input } from '@angular/core';
import {PromocionesService, Promo} from '../shared/promociones.service';
import { MessageService } from 'primeng/api';


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

  @Input() busqueda: string = '';

  constructor(public servicio: PromocionesService, private messageService: MessageService) {
    this.promociones=this.servicio.getPromociones();
    console.log(this.promociones);
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
