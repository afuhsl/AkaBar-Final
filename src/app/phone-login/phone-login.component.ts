import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../windows.service';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from '@angular/fire/auth';
import { Router } from '@angular/router';

export class PhoneNumber {
  pais: string = '';
  area : string = '';
  prefix: string = '';


  //formato e164
  get e164() {
    const num = this.pais + this.area + this. prefix;
    return num;
  }
}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {
  windowRef: any;
  auth = getAuth();
  verificarCodigo: string = '';
  phoneNumber = new PhoneNumber();


  constructor( 
    private win: WindowsService,
    private router: Router){

  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
    
    this.windowRef.recaptchaVerifier.render();
  }

  enviarCodigo(){
    const num = this.phoneNumber.e164;
    const appVerifier = this.windowRef.recaptchaVerifier;

    signInWithPhoneNumber(this.auth, num, appVerifier)
      .then((confirmationResult) => {
        this.windowRef.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error, 'Error')
      })
  }

  verificar(){
    this.windowRef.confirmationResult.confirm(this.verificarCodigo)
      .then((result: any)=> {
        console.log(result)
        this.router.navigate(['/main']);
      })
      .catch((error: any) => {
        console.log(error);
        this.router.navigate(['/login'])
      })
  }
}
