import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailShoeComponent } from './components/detail-shoe/detail-shoe.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PrivateAreaComponent } from './components/private-area/private-area.component';


const routes: Routes = [
  { path: 'scarpa/:id', component: DetailShoeComponent },
  { path: 'home', component: NewArrivalsComponent},
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent }, 
  { path: 'private', component: PrivateAreaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
