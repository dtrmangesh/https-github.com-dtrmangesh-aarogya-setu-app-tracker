import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {FirebaseService} from '../services/firebase.service'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  user: string;
  passwordType = 'password';
  passwordText = 'SHOW';
  isIOS = false;

  userData;
  userCollection
  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly firebase :FirebaseService,
    public platform: Platform) { }

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
    this.user = this.loginForm.get('email').value;
    this.checkUser(this.user);
    
  }

  checkUser(userName) {
    console.log(userName)
    this.userCollection.subscribe( (res: any) => {
      res.forEach(element => {
     if (element.email == userName) {
       console.log(element);
       this.router.navigate(['/home']);
       this.userData = element;
     }
    });
    })
  }
}