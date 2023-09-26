import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOffersComponent } from './components/list-offers/list-offers.component';

const routes: Routes = [
  {path: 'business/offers', component: ListOffersComponent},
  {path: '', redirectTo: '/business/offers', pathMatch: 'full'},
  {path: '**', redirectTo: '/business/offers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
