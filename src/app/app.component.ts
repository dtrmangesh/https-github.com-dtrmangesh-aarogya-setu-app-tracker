import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController,
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      if( event && event.url) {
         this.selectedPath = event.url;
      }
    })
  }
  pages = [
    {
      title:"Profile",
      children: [
        {
          title:"Update Password",
          url:"/update-password",
          icon:"arrow-forward"
        },
        {
          title:"Logout",
          url:"/login",
          icon:"log-out-outline",
        },
      ]
    },
  ];

  selectedPath = ''; 

 

  ngOnInit() {
  }
  
  closeMenu() {
    this.menuCtrl.close();
    this.router.navigate(['/home']);
  }
  onLogout() {
    this.router.navigate(['/login']);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
