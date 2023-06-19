import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, query, collection, getDocs, where } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { PromocionesService } from '../shared/promociones.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

import * as Notiflix from 'notiflix';

const LOCAL_STORAGE_KEY = 'citas';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent{
  reserva!: FormGroup;


  reservaGuardada: boolean = false;
  fechasGuardadas: Date[] = [];
  visible:boolean = false;
  textoVisible: number = 0;
  public loading: boolean;



  constructor(
    private httpclient:HttpClient,
    private messageService: MessageService,
    private cita: FirebaseService,
    private formBuilder: FormBuilder,
    private afAuth: Auth,
    private firestore: Firestore
  ) {
    this.loading = true;
    this.reserva = this.formBuilder.group({
      name: new FormControl('',[Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      place: new FormControl(),
      persons: new FormControl(),
      date: new FormControl('', [Validators.required, this.dateValidator()]),
    })
    
  }

  guardarReserva() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const cita = { ...this.reserva.value, userId };

        const fechaSeleccionada: Date = cita.date;
        this.verificarFechaExistente(fechaSeleccionada).then((existeFecha) => {
          if (existeFecha) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha ya está reservada' });
          } else {
            this.cita.agendarCira(cita)
              .then(() => {
                this.enviocita();
              })
              .catch((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
              });
          }
        })
        .catch((error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        });
      }
    });
  }

  //Valida que la fecha no halla pasado ya
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate: Date = control.value;
      const currentDate: Date = new Date();

      if (selectedDate <= currentDate) {
        return { pastDate: true };
      }

      return null;
    };
  }

  async verificarFechaExistente(fecha: Date): Promise<boolean> {
    //Verifica que durante todo el dia no se halla guardado ya la fecha
    const fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0, 0);
    const fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 23, 59, 59);
  
    const citasRef = collection(this.firestore, 'Citas');
    const citasQuery = query(citasRef, where('date', '>=', fechaInicio), where('date', '<=', fechaFin));
  
    const querySnapshot = await getDocs(citasQuery);
    return querySnapshot.size > 0; // Verificar si hay algún resultado en la consulta
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
    this.httpclient.post('/envioCita',params).subscribe(resp=>{
      console.log(resp)
      Notiflix.Loading.remove();
      this.messageService.add({ severity: 'success', summary: 'Cita Guardada', detail: 'Cita Guardada' });
        this.reserva.reset();
    })
   }

  /*guardarReserva(){
    this.cita.agendarCira(this.reserva.value)
    .then(() => {
      this.enviocita();
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

 */
  
  mostrarTexto(numero: number) {
    this.textoVisible = numero;
  }

  ocultarTexto(numero: number) {
    this.textoVisible = 0;
  }
  data: Promo[] = [
    {
      nombre: "miercoles",
      titulo: "Dia de descanso",
      bio: "Todos los Miercoles comprando 2 botellas seleccionadas te damos la otra a mitad de precio. *Valido hasta las 10:30 pm *Aplica restricciones *Botellas seleccionadas",
      
      
    },
    {
      nombre: "jueves",
      titulo: "Ladie's Night",
      bio: "Barra libre para ellas *Valido los jueves de 5:00 a 9:00 pm *Aplica restricciones",
      
      
    },
    {
      nombre: "viernes",
      titulo: "Botella cumpleañera",
      bio: "Presentando tu INE te regalamos una botella    *Botellas seleccionadas   *Aplica restricciones     *Valido de Viernes a Domingo de 5:00 a 10:00 pm",
      
      
    },
    {
      nombre: "domingo",
      titulo: "Domingo de Cocteleria",
      bio: "2x1 en toda la cocteleria valido de 2:00 a 8:00",
     
    }
    
    ]
    
  value = JSON.stringify(this.data[0]); 
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  cambiarDato(){
    this.value = JSON.stringify(this.data[Math.floor(Math.random() * 3)]);
 
}
}
interface Promo {
  nombre: String;
  titulo: String;
  bio: String;
}
