import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { HttpClient } from '@angular/common/http';
import * as Notiflix from 'notiflix';

const LOCAL_STORAGE_KEY = 'citas'


@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent {
  reserva!: FormGroup;


  reservaGuardada: boolean = false;
  fechasGuardadas: Date[] = [];
  visible:boolean = false;
  textoVisible: number =0;



  constructor(
    private httpclient:HttpClient,
    private messageService: MessageService,
    private cita: FirebaseService) {
    this.reserva = new FormGroup({
      name: new FormControl(),
      email : new FormControl(),
      place : new FormControl(),
      persons : new FormControl(),
      date : new FormControl(),
      })
  }


  guardarReserva(){
    this.cita.agendarCira(this.reserva.value)
    .then(() => {
      this.enviocita();
      })
  }

  enviocita(){
    Notiflix.Loading.standard('Cargando...');
  
    let params = {
      email: this.reserva.value.email,
      asunto: "Confirmacion de Cita",
      nombre : this.reserva.value.name,
      lugar : this.reserva.value.place,
      personas : this.reserva.value.persons, 
      fecha : this.reserva.value.date
    }
    console.log(params)
    this.httpclient.post('http://localhost:3000/envioCita',params).subscribe(resp=>{
      console.log(resp)
      Notiflix.Loading.remove();
      this.messageService.add({ severity: 'success', summary: 'Cita Guardada', detail: 'Cita Guardada' });
        this.reserva.reset();
    })
   }
  /*
  guardarReserva() {
    const reserva = {
      nombre: this.nombre2,
      email: this.email2,
      cantidadPersonas: this.cantidadPersonas2,
      servicio: this.servicio2,
      fecha: this.fecha2,
      hora: this.hora2
    };
    const service = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]');
    //guarda en formato Date la fecha que agrego el usuario
    const fechaReserva = new Date(reserva.fecha);
    //obtenmos la fecha actual
    const fechaActual = new Date(); 

    if (fechaReserva < fechaActual) {
      this.messageService.add({ severity: 'warn', summary: 'Elija otro dia', detail: 'Fecha pasada' });
      } else if (this.fechaRepetida(reserva.fecha) && service.some((reserva: { servicio: any; }) => reserva.servicio === this.servicio2)) { //Verificamos que la fecha no este en el erreglo aun
      this.messageService.add({ severity: 'error', summary: 'Fecha no disponible!', detail: 'El are esta ocupada este dia' });
      return;
    } else {
      this.lista.push(reserva);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.lista));
      this.reservaGuardada = true; //activa el segundo boton
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Reservacion Guardada' });
    }

  }

  //funcion que verifica que las fechas no se repitan en el arreglo
  //true si la fecha se repite, false si no
  
  fechaRepetida(date: Date): boolean {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const savedList = JSON.parse(savedData)
      for (let i = 0; i < savedList.length; i++) {
        const savedDate = new Date(savedList[i].fecha);
        if (date.getTime() === savedDate.getTime()) {
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  }

  mostrarUltimaReserva() {
    this.visible = true;
    const listaReservas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]');
    if (listaReservas.length > 0) {
      this.ultimaResrvacion = listaReservas[listaReservas.length - 1];
    }
      
  }

 

  mostrarTexto(numero: number) {
    this.textoVisible = numero;
  }

  ocultarTexto(numero: number) {
    this.textoVisible = 0;
  }
 */
}