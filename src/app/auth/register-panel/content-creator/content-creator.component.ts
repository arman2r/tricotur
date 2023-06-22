import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { IonButton } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-content-creator',
  templateUrl: './content-creator.component.html',
  styleUrls: ['./content-creator.component.scss'],
})
export class ContentCreatorComponent implements OnInit {
  @ViewChild('swiper', {static: false}) swiper: any = SwiperComponent
  enSlide = false;
  textButton: string = 'Continuar';

  configSwipper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween:8,
    centeredSlides: true,
    allowTouchMove: false
  }
  date: any
  constructor(private locationService: CurrentLocationService, private router: Router) {
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

  ngAfterContentChecked() {
    if(this.swiper){
      this.swiper.updateSwiper
    }
  }

  nextSlide() {
    console.log(this.swiper.swiperRef)
    if(this.swiper.swiperRef.isEnd == false && this.textButton == 'Continuar'){
      this.textButton = 'Continuar'
      this.swiper.swiperRef.slideNext(500)
      console.log('es fin', this.swiper.swiperRef.isEnd)
      if(this.swiper.swiperRef.isEnd == true) {
        this.textButton = 'Listo, enviar registro';
      }
    } else {
      this.router.navigate(['/channel'])
    }

  }

  prevSlide() {
    this.swiper.swiperRef.slidePrev(500)
    if(this.swiper.swiperRef.isEnd == false){
      this.textButton = 'Continuar'

    }
  }

}
