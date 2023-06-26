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
      200: {
        slidesPerView: 2,
      },
      280: {
        slidesPerView: 2.3,
      },
      // when window width is >= 480px
      330: {
        slidesPerView: 3.5,
      },
      420: {
        slidesPerView: 4.5,
      },
      640: {
        slidesPerView: 7,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 10,
      }
    }
  };

  configSwipperProdAndPlains: SwiperOptions = {
    spaceBetween: 4,
    centeredSlides: false,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      200: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      330: {
        slidesPerView: 1.1,
      },
      420: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
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
