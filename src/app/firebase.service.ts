import { Injectable } from '@angular/core';
import { Firestore, QuerySnapshot, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, where,  } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
import { Registro } from './registro';
import { Cita } from './cita';
import 'firebase/auth';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: Firestore,
    private auth: Auth) { }
  

  agendarCira(cita: Cita){
    const registro = collection(this.firestore, 'Citas');
    return addDoc(registro, cita);
  }

  agregarRegistro(usuer : Registro){
    const usuario = collection(this.firestore, 'Usuarios');
    return addDoc(usuario, usuer);
  }

  crearCuenta({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut(){
    return signOut(this.auth);
  }

  mostrarUsuarios(): Observable<Registro[]>{
    const user = collection(this.firestore, 'Usuarios');
    return collectionData(user, {idField: 'id'}) as Observable<Registro[]>;
  }

  mostrarCitas(): Observable<Cita[]>{
    const cita = collection(this.firestore, 'Citas');
    return collectionData(cita, {idField: 'id'}) as Observable<Cita[]>;
  }
  

  eliminarCita(cita: Cita){
    const  cit = doc(this.firestore,`Citas/${cita.id}`);
    return deleteDoc(cit);
  }

  async verificarTelefono(telefono:any) : Promise<boolean> {
    const tel = collection(this.firestore, 'Usuarios');
    const q = query(tel, where('phone', '==',telefono));
    
    try {
      const querySnapshot: QuerySnapshot<any> = await getDocs(q);
      return !querySnapshot.empty;
    } catch (e) {
      throw e;
    }
  }
}

