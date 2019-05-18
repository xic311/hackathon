import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageMapComponent } from './page-map/page-map.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: PageMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
