import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddPodComponent } from './add-pod/add-pod.component';



const routes: Routes = [
  
  {
    path: '',
    component:AddPodComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodRoutingModule { }