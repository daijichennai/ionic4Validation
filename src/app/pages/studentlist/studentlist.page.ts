import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommfunService } from 'src/app/services/commfun.service';
@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.page.html',
  styleUrls: ['./studentlist.page.scss'],
})
export class StudentlistPage implements OnInit {
  public jsonItems: any;
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private myFunc: CommfunService,
    ) { }

  ngOnInit() {
    this.getStudentData();
  }

  async  getStudentData() {
    let data: any;
    const url = this.myFunc.domainURL + 'handlers/mit.ashx?mode=selRegStud';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.jsonItems = result;
        loading.dismiss();
      });
      // return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

}
