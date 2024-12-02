import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailShoeComponent } from './components/detail-shoe/detail-shoe.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateAreaComponent } from './components/private-area/private-area.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NewArrivalsComponent,
    DetailShoeComponent,
    FooterComponent,
    CartComponent,
    PaymentComponent,
    LoginComponent,
    PrivateAreaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
