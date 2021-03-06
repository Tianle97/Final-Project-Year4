import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { AboutPage } from '../about/about';
import { StreamingMedia, StreamingAudioOptions, StreamingVideoOptions } from '@ionic-native/streaming-media';

/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

  email: string; //这个email参数在html
  
  constructor(public streamingMedia: StreamingMedia,private app: App, private fire: AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
    this.email = fire.auth.currentUser.email;
  }
  // logout按钮， html 添加button
  logout() {
    // push():是异步的，带有过度效果，可以返回(有返回按钮)
    // setRoot():是一个view之间的切换，所以不带有任何返回button之类的东西，
    // this.nav.setRoot(page,params,opt);
    // 1、page 组件: 想放进导航的 组件名称 
    // 2、params 参数：像下一个页面传递参数 Object类型 
    // 3、过度完成。返回一个promise
    window.localStorage.removeItem(this.email);
    // this.navCtrl.setRoot(WelcomePage);
    this.app.getRootNav().setRoot(WelcomePage);
    console.log(this.fire.auth.currentUser);
    //window.localStorage.removeItem('email');
  }

  listen(){
    this.navCtrl.push(AboutPage);
    let options: StreamingAudioOptions = {
      successCallback: () => {console.log('Finished Audio')},
      errorCallback: (e) => {console.log('Error: ', e)},
      initFullscreen: false, // IOS only!
    };
    this.streamingMedia.playAudio('file:///Users/weichenwang/Music/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/Linkin%20Park%20-%20Leave%20Out%20All%20the%20Rest%20(One%20More%20Light%20Live).mp3', options);
    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

}
