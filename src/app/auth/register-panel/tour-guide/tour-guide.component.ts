import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { Geolocation } from '@capacitor/geolocation';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-tour-guide',
  templateUrl: './tour-guide.component.html',
  styleUrls: ['./tour-guide.component.scss'],
})
export class TourGuideComponent implements OnInit {

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
