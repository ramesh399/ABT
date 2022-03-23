import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddPodComponent } from './pod/add-pod/add-pod.component';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./pod/pod.module').then( m => m.PodModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
