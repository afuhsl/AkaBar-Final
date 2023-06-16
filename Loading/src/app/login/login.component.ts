import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { WindowsService } from '../windows.service';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  selectedTemplate: string | null = null;
  register!: FormGroup;
  formAccesso!: FormGroup;
  formPhone!: FormGroup;
  windowRef: any;
  auth = getAuth();
  verificarCodigo: string = '';


  constructor(
    private Usuario: FirebaseService,
    private router: Router,
    private win: WindowsService,
    private rouer: Router
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

    this.formPhone = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
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
    Notiflix.Loading.standard('Cargando...');
    this.Usuario.login(this.formAccesso.value)
      .then(response => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success("Bienvenido de vuelta");
        this.router.navigate(['/home']);
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
    this.windowRef.recaptchaVerifier.render();
  }

  //Acceso con numero de telefono
  onSubmit() {
    const num = this.formPhone.value;
    const appVerifier = this.windowRef.recaptchaVerifier;
    
      signInWithPhoneNumber(this.auth, num, appVerifier)
          .then((confirmationResult) => {
            this.windowRef.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            console.log(error, 'Error')
          });
    

  }

  verificar(){
    Notiflix.Loading.standard('Cargando...');
    this.windowRef.confirmationResult.confirm(this.verificarCodigo)
      .then((result: any)=> {
        Notiflix.Loading.remove();
        Notiflix.Notify.success("Bienvenido Nuevo Usuario");
        console.log(result)
        this.rouer.navigate(['/main']);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }
  //Boton del formulario de registro
  registrar() {
    console.log(this.register.value);
    //Guarda datos en la base de datos nosql
    this.Usuario.agregarRegistro(this.register.value)
      .then(response => {
        alert('Registro Guardado')
        //Crea el usuario en firebase con email y contraseña
        this.Usuario.crearCuenta(this.register.value)
        console.log(response);
      })
      .catch(error => {
        alert('Error registro')
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
