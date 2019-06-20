import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component'
import { DetailComponent } from './detail/detail.component'
import { ContactComponent } from './contact/contact.component'
import { SettingsComponent } from './settings/settings.component'

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'detail/:idSerre', component: DetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
