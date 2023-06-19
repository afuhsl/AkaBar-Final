import { Component, ViewChild } from '@angular/core';
import { Firestore, Timestamp, collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FirebaseService } from '../firebase.service';
import { Cita } from '../cita';
import { formatDate } from '@angular/common';

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
  canvas: any;
  ctx: any;
  cit!: Cita[];
  @ViewChild('myChart') myChart: any;
  @ViewChild('myChart2') myChart2: any;
  @ViewChild('myChart3') myChart3: any;

  /*datos: dato = [
    { cantidad: 0, hora: "1:00 am", pedidos: 0 },
    { cantidad: 0, hora: "12:00 am", pedidos: 0 },
    { cantidad: 0, hora: "11:00 pm", pedidos: 0 },
    { cantidad: 0, hora: "10:00 pm", pedidos: 0 },
  ];*/
  
  constructor( 
    private firestore: Firestore,
    private cita: FirebaseService
    ){}
  
  ngOnInit():void{
    //this.mostrar();
    this.loadData();
    this.reservaporZona();
    this.grafico3();

    this.cita.mostrarCitas().subscribe(cita =>{
      this.cit = cita;
    })
  }

  formatearFecha(fecha: Timestamp): string {
    return formatDate(fecha.toDate(), 'dd/MM/yyyy', 'en-US');
  }
/*
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
  */
  loadData(){
    //referencia a la tabla
    const tabalRef = collection(this.firestore, 'Citas');

    getDocs(tabalRef).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) =>{
        const cita = doc.data();
        return cita['date'].toDate();
      });

      const citasPorMes = this.citasMes(data);
      this.crearChart(citasPorMes);
    });
  }

  citasMes(data: any[]){
    const citasPorMes: any[] = [];

    data.forEach(date => {
      const mes = date.getMonth();
      citasPorMes[mes] = (citasPorMes[mes] || 0) + 1; 
    });

    for(let i=0; i<12; i++){
      citasPorMes[i]=citasPorMes[i] || 0;
    }

    return citasPorMes;
  }

  crearChart(citasPorMes: any[]){
    const labels = Object.keys(citasPorMes);
    const data= Object.values(citasPorMes);
    this.canvas = this.myChart.nativeElement;
    this.ctx= this.canvas.getContext("2d");
    console.log(labels);
    console.log(data);

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
          datasets: [{
            label: 'Cantidad de citas',
            data: data,
            backgroundColor: '#f44336',
            borderColor: '#3358ff',
            borderWidth: 1
          }],
       }
    });
  }

  reservaporZona(){
    const reservaZona: any[] = [];
    const zonaRef = collection(this.firestore, 'Citas');
    getDocs(zonaRef).then((querySnapshot) =>{
      const datosReser = querySnapshot.docs.map((doc)=>{
        const reserva = doc.data();
        return { zona: reserva['place']
      };
      });

     

      datosReser.forEach((reserva)=>{
        const zona = reserva.zona;

        if(!reservaZona[zona]){
          reservaZona[zona] = 0;
        }

        reservaZona[zona]++;
      });

      const labels = Object.keys(reservaZona);
      const data = Object.values(reservaZona);
      this.canvas = this.myChart2.nativeElement;
      this.ctx= this.canvas.getContext("2d");

      new Chart(this.ctx, {
        type:'pie',
        data:{
          labels: labels,
          datasets: [{
            label: 'Numero de reservaciones',
            data: data,
            backgroundColor: ['#737cd1', '#ff8c00', '#00bfff', '#00ff00']
          }]
        },
        options:{
          responsive: true
        }
      });
    });
  }

  grafico3(){
    const citasRef = collection(this.firestore, 'Citas');
    const queryr = query(citasRef, orderBy('date'));

getDocs(queryr).then((querySnapshot) => {
  const data = querySnapshot.docs.map((doc) => {
    const cita = doc.data();
    return {
      fecha: moment(cita['date'].toDate()).format('DD/MM/YY'), // Convertir timestamp a objeto Date
      personas: cita['persons']
    };
  });

  // Prepara los datos para el gráfico
  const labels = data.map((item) => item.fecha);
  const values = data.map((item) => item.personas);
  this.canvas = this.myChart3.nativeElement;
  this.ctx= this.canvas.getContext("2d");



  // Crea el gráfico de área
  new Chart(this.ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cantidad de personas',
        data: values,
        backgroundColor: 'rgba(115, 124, 209, 0.5)', // Color de fondo del área
        borderColor: '#737CD1', // Color del borde del área
        borderWidth: 2, // Ancho del borde del área
      }]
    },
  });
});
  }
}
