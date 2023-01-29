import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-register-globetrotter',
  templateUrl: './register-globetrotter.component.html',
  styleUrls: ['./register-globetrotter.component.scss'],
})
export class RegisterGlobetrotterComponent implements OnInit {
  date: any
  constructor() {
    //this.date = new Date().toDateString();
  }

  ngOnInit() {

  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
  };

  dateTimeUpdated(event: any): void {
    try{
      const newVal = event.detail.value
      const formatted = format(parseISO(newVal), 'dd/MM/yyyy');
      console.log('fecha formateada',formatted)
      this.date = formatted
    } catch (error) {
      console.log(error)
    }
  }


}
