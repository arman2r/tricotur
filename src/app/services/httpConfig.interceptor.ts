/* eslint-disable arrow-body-style */
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage-angular';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
//httpConfig.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  loaderToShow: any;
  closeModal = false;
  token = '';
  constructor(
    public loadingController: LoadingController,
    private storage: Storage,
    private auth: AuthenticationService
  ) { }

  // async getToken() {
  //   await this.storage.create();
  //   this.token = await this.storage.get('TOKEN_SERVICE') !== undefined ? await this.storage.get('TOKEN_SERVICE') : '';
  // }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.getToken())
    const token = localStorage.getItem('TOKEN_SERVICE') !== undefined ? localStorage.getItem('TOKEN_SERVICE') : '';

    // console.log(token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Credentials': 'true',
    });

    //Authentication by setting header with token value
    // if (request.url !== 'http://190.131.194.154:8090/Account/Login') {
    if (token !== null) {
      // console.log('tiene token');
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Authorization': 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    }
    // }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    }

    request = request.clone(request);
    // console.log(request);
    // this.presentLoading('Aguarde por favor, estamos procesando su solicitud.', 5000, false);
    // console.log(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // this.loadingController.dismiss();
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
          // this.presentLoading('Solicitud registrada con éxito.', 3000, true);
          // this.loadingController.dismiss();
        }
        // this.hideLoader();
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // console.log(error);

        // this.presentLoading('Discúlpenos, no logramos procesar su solicitud, por favor intente más tarde.', 5000, true);
        // this.loadingController.dismiss();

        // this.hideLoader();
        return throwError(error);
      }));

  }

}
