import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  private promociones:Promo[] = [
    {
      nombre: "miercoles",
      titulo: "Dia de descanso",
      bio: "Todos los Miercoles comprando 2 botellas seleccionadas te damos la otra a mitad de precio. *Valido hasta las 10:30 pm *Aplica restricciones *Botellas seleccionadas",
      img: "assets/imagenes/miercoles.png",
      
    },
    {
      nombre: "jueves",
      titulo: "Ladie's Night",
      bio: "Barra libre para ellas *Valido los jueves de 5:00 a 9:00 pm *Aplica restricciones",
      img: "assets/imagenes/jueves.png",
      
    },
    {
      nombre: "viernes",
      titulo: "Botella cumpleañera",
      bio: "Presentando tu INE te regalamos una botella    *Botellas seleccionadas   *Aplica restricciones     *Valido de Viernes a Domingo de 5:00 a 10:00 pm",
      img: "assets/imgagenes/viernes.png",
      
    },
    {
      nombre: "domingo",
      titulo: "Domingo de Cocteleria",
      bio: "2x1 en toda la cocteleria valido de 2:00 a 8:00",
      img: "assets/imagenes/domingo.png",
    }

  ];
  constructor() { 
    console.log("Servicio listo para usarse");
  }

  getPromociones():Promo[]{
    return this.promociones;
  }
}

export interface Promo{
  nombre: string;
  titulo: string;
  bio: string;
  img: string;
  
}


