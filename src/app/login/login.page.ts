import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {FirebaseService} from '../services/firebase.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  user: string;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly firebase :FirebaseService  ) { }

  ngOnInit() {
    this.initializeLoginForm();
    // this.firebase.createSong();
    var userInfo = this.firebase.readDatabse().valueChanges();
    userInfo.subscribe(res =>console.log(res))
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
    });
  }

  submitLoginDetails() {
    this.user = this.loginForm.get('email').value;
    this.router.navigate(['/home']);
  }
}