import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentCreatorComponent } from './content-creator/content-creator.component';
import { RegisterBasicComponent } from './register-basic/register-basic.component';
import { RegisterGlobetrotterComponent } from './register-globetrotter/register-globetrotter.component';
import { RegisterHomeComponent } from './register-home/register-home.component';

import { RegisterPanelPage } from './register-panel.page';
import { TourGuideComponent } from './tour-guide/tour-guide.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "register-home",
    pathMatch: 'full'
  },
  {
    path: '',
    component: RegisterPanelPage,
    children: [
      {
        path: 'register',
        component: RegisterBasicComponent,
      },
      {
        path: 'register-home',
        component: RegisterHomeComponent,
      },
      {
        path: 'register-globetrotter',
        component: RegisterGlobetrotterComponent,
      },
      {
        path: 'register-guide',
        component: TourGuideComponent,
      },
      {
        path: 'register-content-creator',
        component: ContentCreatorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPanelPageRoutingModule {}
