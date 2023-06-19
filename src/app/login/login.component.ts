import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { WindowsService } from '../windows.service';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  selectedTemplate: string | null = null;
  register!: FormGroup;
  formAccesso!: FormGroup;
  
  


  constructor(
    private Usuario: FirebaseService,
    private router: Router,
    private win: WindowsService,
    private messageService: MessageService
  ) {
    //Formulario de Regisgtro
    this.register = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required, this.matchPassword.bind(this)]),
      phone: new FormControl()
    });

    //Formulario de inicio de sesion
    this.formAccesso = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }



  //Verifica la contraseña que sean iguales
  matchPassword(control: AbstractControl): { [key: string]: any } | null {
    const password = this.register?.get('password')?.value;
    const confirmpassword = control.value;
    if (password !== confirmpassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  logIn() {
    this.Usuario.login(this.formAccesso.value)
      .then(response => {
        this.messageService.add({ severity: 'success', summary: 'Bienvenido!!', detail: 'Bienvenido a AkaBar' });
        this.router.navigate(['/home']);
        console.log(response)
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Cuenta no encontrada!!', detail: 'Intentalo de nuevo' });
        console.log(error)
      });
  }

  ngOnInit(): void {
  
  }

  //Acceso con numero de telefono
 

  
  //Boton del formulario de registro
  registrar() {
    console.log(this.register.value);
    //Guarda datos en la base de datos nosql
    this.Usuario.agregarRegistro(this.register.value)
      .then(response => {
        this.messageService.add({ severity: 'success', summary: 'Exito!!', detail: 'Registro Guardado' });
        //Crea el usuario en firebase con email y contraseña
        this.Usuario.crearCuenta(this.register.value)
        console.log(response);
        this.register.reset();
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Lo sentimos!!', detail: 'El registro no se pudo realizar' });
        console.log(error);
      })
  }

  //Muestra el formulario de inicio de sesion
  showEmailTemplate() {
    this.selectedTemplate = 'email';
  }

  //Muestra el formulario de inicio con numero de telefono
  showPhoneTemplate() {
    this.selectedTemplate = 'phone';
  }

  showRegisterTemplate(){
    this.selectedTemplate ='register';   
  }
}
