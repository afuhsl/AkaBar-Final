import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Cita } from '../cita';
import { formatDate } from '@angular/common';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  lista: any[] = [];  
  

  constructor( 
    private auth : Auth,
    private firestore: Firestore,
    private cita :FirebaseService
    ){}
  
  ngOnInit(): void {
      
    const citasRef = collection(this.firestore, 'Citas');
    const citasQuery = query(citasRef, where('userId', '==', this.auth.currentUser?.uid));
  
    getDocs(citasQuery).then((querySnapshot) => {
      this.lista = querySnapshot.docs.map((doc) => doc.data() as Cita);
    });
  }

  formatearFecha(fecha: Timestamp): string {
    return formatDate(fecha.toDate(), 'dd/MM/yyyy', 'en-US');
  }

  onClickDelete(cita: Cita){
    this.cita.eliminarCita(cita)
  }
 
}
