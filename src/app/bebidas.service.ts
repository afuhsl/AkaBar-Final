import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { IBebida } from './buscar/bebida';



@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  private recetas = new BehaviorSubject<IBebida []>([]);

  recetas$ = this.recetas.asObservable();

  constructor(public httpClient: HttpClient) { }

  async setRecetas(url:string) {
    const response: any = await firstValueFrom(this.httpClient.get(url));

    console.log(response.drinks)
     this.recetas.next(response.drinks as IBebida []);
  }

}