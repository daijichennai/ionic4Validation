import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { Router } from '@angular/router';
import { CommfunService } from 'src/app/services/commfun.service';
import { LoadingController, ToastController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private myFunc: CommfunService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private storage: Storage,
    private menuCtrl: MenuController
    ) {
   }

   ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      mobileNo : new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required
      ]))
    });
  }


  goLoginPage() {
    this.router.navigate(['/login']);
  }

  async onSubmit(values) {
    console.log(values);
    // this.router.navigate(["/user"]);
    // console.log(values.matching_passwords.password);
    let data: any;
    // tslint:disable-next-line:max-line-length
    const url = this.myFunc.domainURL + 'handlers/mit.ashx?mode=register&userEmail=' + values.email + '&userPassword=' + values.matching_passwords.password + '&userName=' + values.username + '&userMobileNo=' + values.mobileNo;
    const loading = await this.loadingCtrl.create({
      message: 'Creating New User...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        if (result[0].status === 'success') {
          this.router.navigate(['/login']);
          this.presentToast('Register Sucessfully 😄');
        } else {
          this.presentToast('Error Occured.Try Again Later 😞...!');
        }
        // this.storage.set('lsUserName', result[0].userName);
        // this.storage.set('lsUserEmail', result[0].userEmail);
        // this.storage.set('lsUserID', result[0].userID);
        // this.storage.set('lsUserRole', result[0].userRole);
        console.log(result);
        loading.dismiss();
      });
      // return loading.present();
    }, error => {
      this.presentToast('Invalid Email or Password 😞...!');
      loading.dismiss();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // tslint:disable-next-line:member-ordering
  validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    mobileNo : [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
    ]
  };

}
