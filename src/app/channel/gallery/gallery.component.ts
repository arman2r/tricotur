import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';
import { ActionSheetController, IonicSlides } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from '@capacitor/camera';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements AfterContentChecked {
  gallery = []
  @ViewChild('swiper') swiper: any = SwiperComponent
  result!: string;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween:8
    //pagination: true
  }

  configTwo: SwiperOptions = {
    slidesPerView: 1.5,
    spaceBetween: 8
    //pagination: true
  }

  configTwoEnd: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 8
    //pagination: true
  }

  constructor(private actionSheetCtrl: ActionSheetController, public photoService: PhotoService) { }

  ngAfterContentChecked() {
    if(this.swiper){
      this.swiper.updateSwiper
    }
  }

  async uploadImageEvent(index: number, photo: any, number: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Agregue una foto de portada',
      subHeader: 'Captura una foto desde tu cámara o selecciona una que tengas guardada en tus dispositivo',
      buttons: [
        {
          text: 'Tomar foto',
          role: 'selected',
          icon: 'camera',
          data: {
            action: 'capture',
          },
        },
        {
          text: 'Buscar imágen en galería',
          role: 'selected',
          icon: 'image',
          data: {
            action: 'gallery',
          },
        },
        {
          text: 'Eliminar imagen',
          role: 'destructive',
          data: {
            picture: photo,
            position: number,
            action: 'delete',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = result.data;
    console.log(this.result)
    this.capture(this.result)
  }

  async capture(result: any) {
    if(result.action === 'capture') {
      this.photoService.addNewToGallery();
    } else if(result.action === 'delete') {
      console.log('eliminar imagen')
      this.photoService.deletePicture(result.picture, result.position)
    } else {
      console.log('buscar en galería')
      await this.photoService.loadSaved();
    }

  }

  async getLogo(result: any) {
    if(result.action === 'capture') {
      this.photoService.addNewToGallery();
    } else if(result.action === 'delete') {
      console.log('eliminar imagen')
      this.photoService.deletePicture(result.picture, result.position)
    } else {
      console.log('buscar en galería')
      await this.photoService.loadSaved();
    }

  }

}
