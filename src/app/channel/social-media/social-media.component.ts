import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { ModalSocialMediaAddComponent } from '../modal-social-media-add/modal-social-media-add.component';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  modelData: any;
  socialMediaList: any = []
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: ModalSocialMediaAddComponent,
      initialBreakpoint: 0.4,
      breakpoints : [0, 0.4, 0.5, 0.65],
      componentProps: {
        socialMedia: this.socialMediaList,
      }
    });
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData)
      if (modelData.data !== undefined) {
        console.log(modelData)
        this.modelData = modelData.data;
      }
      console.log(this.modelData)
      this.socialMediaList.push(this.modelData)
    });
    return await modal.present();
  }

  deleteSM(socialMedia: any) {
    console.log('todas las redes sociales', this.socialMediaList)
    var filterArr = this.socialMediaList.filter((x:any) => x.socialMedia != socialMedia)
    console.log(filterArr)
    this.socialMediaList = filterArr
  }

}
