import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { format, parseISO } from 'date-fns';
import { CurrentLocationService } from 'src/app/services/current-location.service';

@Component({
  selector: 'app-content-creator',
  templateUrl: './content-creator.component.html',
  styleUrls: ['./content-creator.component.scss'],
})
export class ContentCreatorComponent implements OnInit {

  date: any
  constructor(private locationService: CurrentLocationService) {
    //this.date = new Date().toDateString();
  }

  ngOnInit() {

  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    this.locationService.getCurrentLocation(coordinates.coords.latitude, coordinates.coords.longitude).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
    //this.getCurrentLocation(coordinates.coords.latitude, coordinates.coords.longitude)

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
