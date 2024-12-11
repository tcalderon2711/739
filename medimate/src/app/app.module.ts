import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRxComponent } from './add-rx/add-rx.component';
import { FormsModule } from '@angular/forms';
import { PrescriptionService } from './shared/prescription.service';
import { FdaInfoComponent } from './fda-info/fda-info.component';
import { LocationsComponent } from './locations/locations.component';
import { HomeComponent } from './home/home.component';
import { RemindersComponent } from './reminders/reminders.component';

@NgModule({
  declarations: [
    AppComponent,
    PrescriptionsComponent,
    AddRxComponent,
    FdaInfoComponent,
    LocationsComponent,
    HomeComponent,
    RemindersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    PrescriptionService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
