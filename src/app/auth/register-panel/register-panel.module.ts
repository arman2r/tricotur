import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPanelPageRoutingModule } from './register-panel-routing.module';

import { RegisterPanelPage } from './register-panel.page';
import { RegisterBasicComponent } from './register-basic/register-basic.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { RegisterGlobetrotterComponent } from './register-globetrotter/register-globetrotter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPanelPageRoutingModule
  ],
  declarations: [RegisterPanelPage, RegisterBasicComponent, RegisterHomeComponent, RegisterGlobetrotterComponent]
})
export class RegisterPanelPageModule {}
