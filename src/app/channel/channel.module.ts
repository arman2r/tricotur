import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelPageRoutingModule } from './channel-routing.module';

import { ChannelPage } from './channel.page';
import { GalleryComponent } from './gallery/gallery.component';
import { RegisterChannelComponent } from './register-channel/register-channel.component';
import { SwiperModule } from 'swiper/angular';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ThemeChannelCreatorComponent } from './theme-channel-creator/theme-channel-creator.component';
import { ModalSocialMediaAddComponent } from './modal-social-media-add/modal-social-media-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelPageRoutingModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  declarations: [ChannelPage, GalleryComponent, RegisterChannelComponent, SocialMediaComponent, ThemeChannelCreatorComponent, ModalSocialMediaAddComponent],
  exports: [GalleryComponent, SocialMediaComponent, ThemeChannelCreatorComponent]
})
export class ChannelPageModule {}
