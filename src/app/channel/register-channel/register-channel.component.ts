import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-register-channel',
  templateUrl: './register-channel.component.html',
  styleUrls: ['./register-channel.component.scss'],
})
export class RegisterChannelComponent implements OnInit {
  channelCreateForm!: FormGroup;
  gallery = []
  result!: string;
  @ViewChild('logoFile', { static: false }) public logoFile!: ElementRef;

  constructor(private actionSheetCtrl: ActionSheetController, public photoService: PhotoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.channelCreateForm = this.fb.group({
      channelName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      channelUbication: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      channelDescription: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]]
    })
  }

  async uploadLogoEvent(index: number, photo: any, number: any) {
    console.log('entro al event', photo)
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Agregue un logo a su canal',
      subHeader: 'Captura una foto desde tu cámara o selecciona una que tengas guardada en tu dispositivo',
      backdropDismiss: false,
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
          icon: 'trash',
          data: {
            picture: photo,
            position: number,
            action: 'delete',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        }
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = result.data;
    console.log('resultado del action sheet',this.result)
    this.getLogo(this.result)
  }

  async getLogo(result: any) {
    console.log('que trae result', result)

    if(result.action === 'capture') {
      this.photoService.addLogoChannel();
    } else if(result.action === 'delete') {
      console.log('eliminar imagen', result)
      this.photoService.deleteLogo(result.picture, result.position);
      this.photoService.logo = []
    } else if(result.action !== 'capture' && result.action !== 'delete' && result.action !== 'cancel') {
      console.log('buscar en galería')
      //await this.photoService.loadSaved();
      console.log(this.logoFile.nativeElement)
      this.logoFile.nativeElement.click()
    } else {
      await this.actionSheetCtrl.dismiss();
    }

  }

  captureTextChannel(key: string, value:string) {
    console.log(key, value)
  }

  getImageInpt() {
    var fileName = this.logoFile.nativeElement.value;
    //console.log(fileName)
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    let paramsImgSave;
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png") {
      var file = this.logoFile.nativeElement.files[0];
      const fr = new FileReader()
      fr.readAsArrayBuffer(file)
      let url;
      fr.onload = async () => {
          // you can keep blob or save blob to another position
          const blob = new Blob([fr.result!])

          // url for download
          url = URL.createObjectURL(blob);
          //console.log(url)
          paramsImgSave = {
            format: extFile,
            saved : false,
            webPath: url
          }
          this.photoService.addLogoFileChooserChannel(paramsImgSave)
          await this.actionSheetCtrl.dismiss();
      }

    } else {
      console.log('la extension del archivo no es permitido')
      this.logoFile.nativeElement.value = null
    }
  }

}
