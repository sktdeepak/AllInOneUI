import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseConverterComponent } from './converter/case-converter/case-converter.component';
import { HomeComponent } from './home/home.component';
import { DateDifferenceComponent } from './converter/date-difference/date-difference.component';
import { AverageCalculateComponent } from './converter/average-calculate/average-calculate.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { LoginComponent } from './login/login.component';
import { RoleComponent } from './role/role.component';
import { UserViewComponent } from './master/user-view/user-view.component';
import { FieldWorkComponent } from './agriculture/field-work/field-work.component';
import { PriceViewComponent } from './master/price-view/price-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPriceDetailComponent } from './agriculture/user-price-detail/user-price-detail.component';
import { ProductComponent } from './agriculture/product/product.component';
import { ProductCategoryComponent } from './agriculture/product-category/product-category.component';
import { BuySellComponent } from './agriculture/buy-sell/buy-sell.component';
import { AddProductBuySellComponent } from './popups/add-product-buy-sell/add-product-buy-sell.component';


const routes: Routes = [{ path: 'convertcase', component: CaseConverterComponent },
{ path: 'datedifference', component: DateDifferenceComponent },
{ path: 'average', component: AverageCalculateComponent },
{ path: '', component: CaseConverterComponent },
{ path: 'home', component: HomeComponent },
{ path: 'register', component: RegisterationComponent },{ path: 'login', component: LoginComponent },
{ path: 'role', component: RoleComponent },
{ path: 'userview', component: UserViewComponent },
{ path: 'fieldwork', component: FieldWorkComponent },
{ path: 'price', component: PriceViewComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'pricedetail', component: UserPriceDetailComponent },
{ path: 'product', component: ProductComponent },
{ path: 'productcategory', component: ProductCategoryComponent },
{ path: 'buysell', component: BuySellComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
