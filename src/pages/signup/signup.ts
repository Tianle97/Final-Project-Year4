import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// Add import  AngularFireAuth
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';

//import the TabsPage in here，导航并进入TabsPage
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from "../login/login";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  //Add 4个@ViewChild 值，该值出自html文件 e.g. #name
  //@ViewChild('name') name;
  //@ViewChild('email') email;
  //@ViewChild传入一个字符串username, 变量uname接收，其它不变。
  //@ViewChild传入一个字符串password, 变量password接收，其它不变。
  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //弹窗提示
  alert(message: string){
    this.alertCtrl.create({
      title: 'Dear User :😱',
         subTitle: 'Please check enter your email !!! ',
         buttons: ['OK']
    }).present();
  }


  signup(){       //registerUser()
    //Api connections
    //定向导航到TabsPage，要记住上面的import
    // this.navCtrl.push(LoginPage);
    //写注册 登陆方法用邮箱
    this.fire.auth.createUserWithEmailAndPassword(this.uname.value, this.password.value)
    .then(data => {
       console.log('got data', this.fire.auth.currentUser);
       this.alert('Registered!');
       this.navCtrl.push(LoginPage);
       let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 500
      });
      loader.present();
     })
    .catch(error => {
       console.log('got an error', error);
       this.alert(error.message);
     });
    console.log('Would register user with ',this.uname.value, this.password.value);

  }

}
