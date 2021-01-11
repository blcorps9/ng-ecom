import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";

import { configureStore } from "./store";

import { InterceptorService } from "./services/interceptor/interceptor.service";
import { ReduxConnectService } from "./services/redux-connect/redux-connect.service";
import { AuthGuard } from "./guards/auth/auth.guard";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BrandsComponent } from "./components/brands/brands.component";
import { InfoSectionComponent } from "./components/info-section/info-section.component";
import { PaymentCardsComponent } from "./components/payment-cards/payment-cards.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { CurrencyInrPipe } from "./pipes/currency-inr.pipe";
import { FavoriteIconComponent } from "./components/favorite-icon/favorite-icon.component";
import { SwatchesComponent } from "./components/swatches/swatches.component";
import { IfInViewportDirective } from "./directives/if-in-viewport/if-in-viewport.directive";
import { MyAccountComponent } from "./pages/my-account/my-account.component";
import { MyCartComponent } from "./pages/my-cart/my-cart.component";
import { AccordionComponent } from "./components/accordion/accordion.component";
import { PdpComponent } from "./pages/pdp/pdp.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ItemTableComponent } from './components/item-table/item-table.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "prod/:id/:category/:name",
    component: PdpComponent,
  },

  // Secure Routes
  {
    path: "my-account",
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "my-cart",
    component: MyCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

const store = configureStore();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    BrandsComponent,
    InfoSectionComponent,
    PaymentCardsComponent,
    ProductCardComponent,
    CurrencyInrPipe,
    FavoriteIconComponent,
    SwatchesComponent,
    IfInViewportDirective,
    MyAccountComponent,
    MyCartComponent,
    AccordionComponent,
    PdpComponent,
    DropdownComponent,
    SpinnerComponent,
    ItemTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: "AppStore",
      useValue: store,
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary, rcs: ReduxConnectService) {
    library.addIconPacks(far, fas, fab);
  }
}
