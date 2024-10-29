import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodPageComponent } from './components/food-page/food-page.component';

export const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'search/:searchItem', component: HomeComponent },
    { path:'tag/:tag', component: HomeComponent },
    { path:'food/:id', component: FoodPageComponent },
];
