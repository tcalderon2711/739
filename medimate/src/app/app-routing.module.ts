import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RemindersComponent } from './reminders/reminders.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'locations',component:LocationsComponent},
  {path:'', redirectTo:'home',pathMatch:'full'},
  { path: 'reminder', component:RemindersComponent}, // New route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
