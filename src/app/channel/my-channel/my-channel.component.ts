import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { EffectCreative, Swiper } from 'swiper';
SwiperCore.use([EffectCreative]);
@Component({
  selector: 'app-my-channel',
  templateUrl: './my-channel.component.html',
  styleUrls: ['./my-channel.component.scss'],
})
export class MyChannelComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper: any = SwiperComponent;
  enSlide = false;

  configSwipperChannel: SwiperOptions = {
    slidesPerView: 3.5,
    spaceBetween: 6,
    centeredSlides: false,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      280: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      330: {
        slidesPerView: 3.5,
      },
      420: {
        slidesPerView: 4.5,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 6,
      }
    }
  };

  configSwipperProdAndPlains: SwiperOptions = {
    spaceBetween: 6,
    centeredSlides: false,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      280: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      330: {
        slidesPerView: 2.5,
      },
      420: {
        slidesPerView: 4,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 6,
      }
    }
  };

  configSwipperSliderChannel: SwiperOptions = {
    grabCursor: true,
    effect: 'creative',
    pagination: { clickable: true },
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['-120%', 0, -500],
      },
      next: {
        shadow: true,
        translate: ['120%', 0, -500],
      },
    },
  };
  constructor() {}

  ngOnInit() {}
}
