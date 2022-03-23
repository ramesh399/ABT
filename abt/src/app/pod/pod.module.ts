import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPodComponent } from './add-pod/add-pod.component';
import { PodRoutingModule } from './pod-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
// import { IonicTimepickerModule } from  '@logisticinfotech/ionic-timepicker';


@NgModule({
  declarations: [AddPodComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PodRoutingModule,
    Ionic4DatepickerModule,
    // IonicTimepickerModule,
     
  ],
  
})
export class PodModule { }
