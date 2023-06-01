/* eslint-disable max-len */
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from } from 'rxjs';

@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    public http: HttpClient,
    private menu: MenuController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  async ifLoggedIn() {
    await this.storage.create();
    // console.log(await this.storage.get('ACCESS_TOKEN_LOGIN'));
    await this.storage.get('ACCESS_TOKEN_LOGIN').then((response) => {
      // console.log(response);
      if (response !== null) {
        this.authState.next(true);
      } else {
        this.authState.next(false);
      }
    }, err => {
      this.logout();
      this.presentToast('Lo sentimos. Ultima Milla no está disponible en este momento, estamos haciendo lo posible para resolver este inconveniente, vuelve a intentar mas tarde.');
    });
  }

/*
  login(dataLogin:any) {
    this.storage.create();
    // const dummy_response = {
    //   'user_id': '007',
    //   'user_name': 'test'
    // };
    // return this.http.post(`${environment.apiUrl}/api/Registry`, JSON.stringify(dataLogin)).map((response: any) => {
    //   this.storage.set('USER_INFO', dummy_response).then((response) => {
    //     this.router.navigate(['dashboard']);
    //     this.authState.next(true);
    //   });
    // });

    return this.http.post(`${environment.apiUrl}/api/auth/Login`, JSON.stringify(dataLogin), {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        })
    }).pipe(
      // return this.http.get(`http://190.131.194.154:8090/POST	/api/auth/Login`).pipe(
      tap(async (res: any) => {
        // console.log(res);
        if (res.estado) {
          // console.log(res);
          await this.storage.set('TOKEN_SERVICE', res.token);
          localStorage.setItem('TOKEN_SERVICE', res.token);
          localStorage.removeItem('namesAlly');
          // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          // this.router.navigate(['dashboard']);
          // this.authState.next(true);
        } else {
          // this.router.navigate(['login']);
          this.authState.next(false);
        }
      }, err => {
        // console.log(err);
        this.authState.next(false);
        this.logout();
        this.presentToast('Lo sentimos. Ultima Milla no está disponible en este momento, estamos trabajando en ello, vuelve a intentar mas tarde.');
        this.router.navigate(['login-with-data']);
      })
    );

    // return this.http.post(`${environment.apiUrl}/api/Registry`, JSON.stringify(dataLogin)).pipe(
    //   map((data: any) => data.token),
    //   switchMap(token => from(
    //     this.storage.set('USER_INFO', token).then((response) => {
    //       this.router.navigate(['dashboard']);
    //       this.authState.next(true);
    //     })
    //   )),
    //   tap(_ => {
    //     this.authState.next(true);
    //   })
    // );
  }
*/
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  validateLogin(dataLogin: any) {
    this.storage.create();
    // const dummy_response = {
    //   'user_id': '007',
    //   'user_name': 'test'
    // };
    // return this.http.post(`${environment.apiUrl}/api/Registry`, JSON.stringify(dataLogin)).map((response: any) => {
    //   this.storage.set('USER_INFO', dummy_response).then((response) => {
    //     this.router.navigate(['dashboard']);
    //     this.authState.next(true);
    //   });
    // });

    /*return this.http.post(`${environment.apiUrl}/api/Account/Login`, JSON.stringify(dataLogin)).pipe(
      // return this.http.get(`http://190.131.194.154:8090/POST	/api/auth/Login`).pipe(
      tap(async (res: any) => {
        // console.log(res);
        if (res.id !== 0) {
          // console.log(res);
          // await this.storage.set('ACCESS_TOKEN_LOGIN', res.token);
          // localStorage.setItem('ACCESS_TOKEN_LOGIN', res.token);
          // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          setTimeout(() => {
            this.router.navigate(['dashboard']);
          }, 1000);

          this.authState.next(true);
        } else {
          this.router.navigate(['./login-width-data']);
          this.presentToast('Lo sentimos. Ultima Milla no está disponible en este momento, estamos haciendo lo posible para resolver este inconveniente, vuelve a intentar mas tarde.');
          this.authState.next(false);
        }
      }, err => {
        this.presentToast('Lo sentimos. Ultima Milla no está disponible en este momento, estamos haciendo lo posible para resolver este inconveniente, vuelve a intentar mas tarde.');
        this.router.navigate(['./login-width-data']);
        this.authState.next(false);
      })
    );*/

    // return this.http.post(`${environment.apiUrl}/api/Registry`, JSON.stringify(dataLogin)).pipe(
    //   map((data: any) => data.token),
    //   switchMap(token => from(
    //     this.storage.set('USER_INFO', token).then((response) => {
    //       this.router.navigate(['dashboard']);
    //       this.authState.next(true);
    //     })
    //   )),
    //   tap(_ => {
    //     this.authState.next(true);
    //   })
    // );
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN_LOGIN');
    // localStorage.removeItem('logEmail');
    // localStorage.removeItem('logPass');
    localStorage.removeItem('activeState');
    localStorage.removeItem('validFormOne');
    localStorage.removeItem('namesAlly');
    this.storage.create();
    this.storage.remove('ACCESS_TOKEN_LOGIN').then(() => {
      this.router.navigate(['login-width-data']);
      this.authState.next(false);
      // this.menu.enable(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  async getToken() {
    localStorage.removeItem('TOKEN_SERVICE');
    return await this.storage.get('TOKEN_SERVICE');
  }
}
