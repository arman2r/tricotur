import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor(private _http: HttpClient) { }

  getCurrentLocation(lat:any, lng:any): Observable<any> {
    return this._http.get("http://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg/geocode/json?latlng="+lat+","+lng+"&sensor=true").pipe((response:any) => response).pipe(
      catchError((error: any) => {
        return throwError(() => new Error(error));
      }));
  }
}
