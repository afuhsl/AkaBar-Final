import { Component } from '@angular/core';
import { Chart } from 'chart.js';

type dato = Array<{ cantidad: any; hora: any; pedidos: any }>;

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent {
  public chart!: Chart;
  visible:boolean =false;
  
  servicio: string[]=['Terraza','Piso1','Piso2','Acera'];
  promociones: string[]=['Botella cumpleañera','Miercoles de descanso', 'Barra libre para ellas','Domingo de cocteleria'];
  numeros: any[]=[];
  solicitud: any[]=[];
  tiempo: any[]=[];

  datos: dato = [
    { cantidad: 0, hora: "1:00 am", pedidos: 0 },
    { cantidad: 0, hora: "12:00 am", pedidos: 0 },
    { cantidad: 0, hora: "11:00 pm", pedidos: 0 },
    { cantidad: 0, hora: "10:00 pm", pedidos: 0 },
  ];
  
  constructor(){}
  
  ngOnInit():void{
    this.mostrar();
  }

  mostrar(): void{
    this.visible = true;
    this.shuffleData();

    this.chart = new Chart('myChart1',{
      type: 'line',
      data: {
        datasets: [{
          label: 'Hora Concurrida',
          data: this.tiempo,
          backgroundColor: "#8F3A88BF",
          borderColor: "#007ee7",
          fill: true,
        },
        {
          label: 'Cantidad de personas en el area',
          data: this.numeros,
          backgroundColor: "#76D7C4",
          borderColor: "#007ee7",
          fill: true,
        }],
        labels: this.servicio
      },
    });

    this.chart = new Chart('myChart',{
      type: 'bar',
      data: { 
        datasets: [{
          label: 'Solicitud de promociones',
          data: this.solicitud,
          backgroundColor: "#737CD1",
          borderColor: "#3358FF",
          fill: true,
        }],
        labels: this.promociones
      },
    });
  }



  shuffleData(){
    this.datos = [
    { cantidad: Math.round( Math.random()*(100-1)+1), hora: Math.round( Math.random()*(24-0)+0), pedidos: Math.round( Math.random()*(10-2)+2) },
    { cantidad: Math.round( Math.random()*(100-1)+1), hora: Math.round( Math.random()*(24-0)+0), pedidos: Math.round( Math.random()*(10-2)+2) },
    { cantidad: Math.round( Math.random()*(100-1)+1), hora: Math.round( Math.random()*(24-0)+0), pedidos: Math.round( Math.random()*(10-2)+2) },
    { cantidad: Math.round( Math.random()*(100-1)+1), hora: Math.round( Math.random()*(24-0)+0), pedidos: Math.round( Math.random()*(10-2)+2) },
  ];
  
  localStorage.setItem('data', JSON.stringify(this.datos));
  for(var i in this.datos){
    this.numeros[i] = JSON.parse(this.datos[i].cantidad); 
    this.solicitud[i] = JSON.parse(this.datos[i].pedidos); 
    this.tiempo[i] = JSON.parse(this.datos[i].hora); 

  }  
  }
}
