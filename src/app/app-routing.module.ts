import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { BaseComponent } from './components/base/base.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductResolver } from './services/product.resolver';

const routes: Routes = [
{path: '', component: BaseComponent },
{path: 'products', component: ProductsComponent },
{path: 'product/:id', component: ProductDetailsComponent, resolve: {data:ProductResolver}  },
{path: 'basket', component: BasketComponent },

{path: '**', redirectTo: '', component: BaseComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
