import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DetailComponent } from "./detail/detail.component";
import { IndexComponent } from "./index/index.component";
import { ContactComponent } from "./contact/contact.component";

import { HttpClientModule } from "@angular/common/http";

import { SensorService } from "./sensor.service";
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    IndexComponent,
    ContactComponent,
    SettingsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SensorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
