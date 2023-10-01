import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { HomeComponent } from './components/home/home.component';
import { NewOfferComponent } from './components/new-offer/new-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'business/offers', component: ListOffersComponent},
  {path:'admins/offers/new', component: NewOfferComponent},
  {path:'admins/offers/edit/:id', component: EditOfferComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
