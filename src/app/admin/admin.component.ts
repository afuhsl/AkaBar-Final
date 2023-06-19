import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Cita } from '../cita';
import { Timestamp } from 'firebase/firestore';
import { FirebaseService } from '../firebase.service';
import { Registro } from '../registro';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  citasProximos7Dias: any[] = [];
  registros: any[] = [];
  consulta3: any[] = [];
  user! : Registro[];
  cita!: Cita[];

  constructor(
    private firestore: Firestore,
    private Usuario : FirebaseService) {
    this.obtenerCitasProximas();
    this.obtenerRegistrosPersonasMayores5();
    this.obtenerRegistrosTerraza();
  }
  ngOnInit(): void {
    this.Usuario.mostrarUsuarios().subscribe( user =>{
      this.user =user;
    });
    this.Usuario.mostrarCitas().subscribe(cita =>{
      this.cita =cita;
    })
  }

  obtenerCitasProximas(){
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 7);

    const citasRef = collection(this.firestore, 'Citas');
    const citasQuery = query(citasRef, where('date', '>=', fechaActual), where('date', '<=', fechaLimite));


    getDocs(citasQuery).then((querySnapshot) =>{
      this.citasProximos7Dias = querySnapshot.docs.map((doc) => doc.data() as Cita);

    })
  }

  formatearFecha(fecha: Timestamp): string {
    return formatDate(fecha.toDate(), 'dd/MM/yyyy', 'en-US');
  }

  obtenerRegistrosPersonasMayores5() {
    const registrosRef = collection(this.firestore, 'Citas');
    const consulta = query(registrosRef, where('persons', '>', '5'));

    getDocs(consulta).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.registros = querySnapshot.docs.map((doc) => doc.data());
        console.log(this.registros)
      });
    });
  }

  obtenerRegistrosTerraza() {
    const registrosRef = collection(this.firestore, 'Citas');
    const consulta = query(registrosRef, where('place', '==', 'Terraza'));
  
    getDocs(consulta).then((querySnapshot) => {
      this.consulta3 = querySnapshot.docs.map((doc) => doc.data());
      console.log(this.consulta3);
    });
  }
}
