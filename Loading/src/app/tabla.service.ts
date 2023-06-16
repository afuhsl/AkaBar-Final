import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablaService {
  constructor() { }

  getLista(){
    const saveData = localStorage.getItem('citas');
    if(saveData){
      return JSON.parse(saveData);
    }
    return [];
  }

}
