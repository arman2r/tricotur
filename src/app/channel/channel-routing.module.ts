import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelPage } from './channel.page';
import { MyChannelComponent } from './my-channel/my-channel.component';
import { RegisterChannelComponent } from './register-channel/register-channel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "register",
    pathMatch: 'full'
  },
  {
    path: '',
    component: ChannelPage,
    children: [
      {
        path: 'register',
        component: RegisterChannelComponent,
      },
      {
        path: 'my-channel',
        component: MyChannelComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelPageRoutingModule {}
