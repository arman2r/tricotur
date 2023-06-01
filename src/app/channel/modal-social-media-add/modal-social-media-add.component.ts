import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-social-media-add',
  templateUrl: './modal-social-media-add.component.html',
  styleUrls: ['./modal-social-media-add.component.scss'],
})
export class ModalSocialMediaAddComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  redSocial = ['Facebook', 'Instagram', 'Tiktok']
  socialMediaModal!: FormGroup;

  constructor(public fb: FormBuilder, public modalController: ModalController) { }

  ngOnInit() {

    this.socialMediaModal = this.fb.group({
      socialMedia : ['', Validators.required],
      socialMediaName : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      socialMediaUrl : ['', [Validators.required, Validators.minLength(16), Validators.maxLength(100)]]
    })

    if(this.modal.componentProps?.['socialMedia'].length !== 0){
      let selectedRed: any = [];
      this.modal.componentProps?.['socialMedia'].forEach((element: any) => {
        selectedRed.push(element.socialMedia)
        //selectedRed = this.redSocial.filter(x => x != element.socialMedia);
      });

      let intersection = this.redSocial.filter(x => !selectedRed.includes(x));

      this.redSocial = intersection
    } else {
      console.log('no trae data')
    }
  }

  async closeModal() {
    const dataForm = {
      'socialMedia':this.socialMediaModal.get('socialMedia')?.value,
      'socialMediaName': this.socialMediaModal.get('socialMediaName')?.value,
      'socialMediaUrl': this.socialMediaModal.get('socialMediaUrl')?.value
    }
    console.log(dataForm)
    await this.modalController.dismiss(dataForm, 'confirm');
  }

}
