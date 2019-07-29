import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommfunService } from '../../services/commfun.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, MenuController  } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  constructor(
    private myFunc: CommfunService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    public menuCtrl: MenuController
  ) {

    console.log(this.myFunc.domainURL);
   }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async  tryLogin(value) {
    let data: any;
    const url = this.myFunc.domainURL + 'handlers/mit.ashx?mode=chkLogin&userEmail=' + value.email + '&userPassword=' + value.password;
    const loading = await this.loadingCtrl.create({
      message: 'Verifying User...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        if (result[0].userRole === 'admin' && result[0].userIsActive === true) {
          this.router.navigate(['/home']);
          this.presentToast('Login Sucessfully 😄');
        } else if (result[0].userRole === 'user' && result[0].userIsActive === true) {
          this.router.navigate(['/userhome']);
          this.presentToast('Login Sucessfully 😄');
        }
        this.storage.set('lsUserName', result[0].userName);
        this.storage.set('lsUserEmail', result[0].userEmail);
        this.storage.set('lsUserID', result[0].userID);
        this.storage.set('lsUserRole', result[0].userRole);
        console.log(result);
        loading.dismiss();
      });
      // return loading.present();
    }, error => {
      this.presentToast('Invalid Email or Password 😞...!');
      loading.dismiss();
    });
    // if(value.email ==='admin@gmail.com' && value.password ==='12345678') {
    //   this.router.navigate(['/home']);
    //   this.presentToast('Login Sucessfully 😄');
    // } else {
    //   this.presentToast('Invalid Email or Password 😞...!');
    // }
    // console.log(value);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }
}
