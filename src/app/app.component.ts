import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('lsUserID').then((val) => {
        if (val != null) {
          // this.router.navigateByUrl('/home');
          this.storage.get('lsUserRole').then((role) => {
            if (role === 'admin') {

              this.appPages = [
                {
                  title: 'Home',
                  url: '/home',
                  icon: 'home'
                },
                {
                  title: 'Student List',
                  url: '/studentlist',
                  icon: 'person'
                },
                {
                  title: 'Settings',
                  url: '/settings',
                  icon: 'cog'
                },
              ];

              this.router.navigateByUrl('/home');
            } else if (role === 'user') {

              this.appPages = [
                {
                  title: 'User Home',
                  url: '/userhome',
                  icon: 'home'
                },
                {
                  title: 'Settings',
                  url: '/settings',
                  icon: 'cog'
                },
                {
                  title: 'Themes',
                  url: '/themes',
                  icon: 'brush'
                }
              ];

              this.router.navigateByUrl('/userhome');
            }
          });
        } else {
          this.router.navigateByUrl('/login');
        }
        console.log(val);
      });
    });
  }
}
