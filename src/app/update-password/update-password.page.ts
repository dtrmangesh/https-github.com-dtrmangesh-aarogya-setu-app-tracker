import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  public updatePasswordForm: FormGroup;
  passwordType = 'password';
  passwordText = 'SHOW';
  newPasswordType = 'password'
  newPasswordText = 'SHOW'
  isIOS = false;
  userData:any;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    public platform: Platform,
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private storage: Storage,) { }


  ngOnInit() {
    this.initializeUpdatePasswordForm();
    this.storage.get('userData').then((val) => {
      this.userData = val;
      console.log('userData', this.userData);
    });
  }

  initializeUpdatePasswordForm() {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ["",
        Validators.compose([
          Validators.minLength(8),
          Validators.required
        ])
      ],

      newPassword: [
        "",
        Validators.compose([
          Validators.minLength(8),
          Validators.required
        ])
      ],
    });
    this.isIOS = this.platform.is('ios');
  }

  hideShowPassword(): void {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordText = this.passwordText === 'SHOW' ? 'HIDE' : 'SHOW';
  }

  hideShowNewPassword(): void {
    this.newPasswordType = this.newPasswordType === 'text' ? 'password' : 'text';
    this.newPasswordText = this.newPasswordText === 'SHOW' ? 'HIDE' : 'SHOW';
  }

  updatePassword() {
    const oldPassword = this.updatePasswordForm.get('oldPassword').value
    const newPassword = this.updatePasswordForm.get('newPassword').value
    if(oldPassword === this.userData.password){
      this.firebaseService.updateUserPassword(this.userData.id, newPassword);
      this.presentToast('Updated Password', 'success');
      this.router.navigate(['/login']);
    }else{
      this.presentToast('Invalid Password', 'danger');

    }
  }

  async presentToast(responseText: string, color = '',) {
    const toast = await this.toastController.create({
      message: responseText,
      duration: 3000,
      position: 'top',
      color,
      cssClass: 'toast-msg',
    });
    toast.present();
  }

}
