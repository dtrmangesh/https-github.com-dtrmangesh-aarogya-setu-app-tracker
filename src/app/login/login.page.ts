import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import {FirebaseService} from '../services/firebase.service'
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  passwordType = 'password';
  passwordText = 'SHOW';
  isIOS = false;

  userData;
  userCollection;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly firebase :FirebaseService,
    public platform: Platform,
    private toastController: ToastController,
    ) { }

   ngOnInit() {
    this.initializeLoginForm();
    this.userCollection= this.firebase.readDatabse().valueChanges();
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+[.]+[a-zA-Z0-9-.]+$',
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
    });
    this.isIOS = this.platform.is('ios');
  }

  hideShowPassword(): void {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordText = this.passwordText === 'SHOW' ? 'HIDE' : 'SHOW';
  }

  submitLoginDetails() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.checkUser(email, password);
  }

  checkUser(userName, password) {
    this.userCollection.subscribe( (res: any) => {
      res.forEach(element => {
     if (element.email === userName && element.password === password) {
       this.userData = element;
     }
    });

    if (this.userData) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          userData: JSON.stringify(this.userData)
        }
       };
       this.router.navigate(['/home'],navigationExtras);
    } else {
      console.log('Invalid');
      this.presentToast('Invalid Credentials');
    }
    })
  }

  async presentToast(responseText: string) {
    const toast = await this.toastController.create({
      message: responseText,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'toast-msg',
    });
    toast.present();
  }
}