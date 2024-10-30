import { Component } from '@angular/core';
import { FoodService } from '../../services/food/food.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Foods from '../../shared/models/food';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsComponent } from '../tags/tags.component';
import { CartService } from '../../services/cart/cart.service';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatIconModule, 
    CurrencyPipe, 
    FormsModule,
    RouterModule,
    TagsComponent,
    NotFoundComponent
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss'
})
export class FoodPageComponent {
  constructor(private fs:FoodService, 
    private route:ActivatedRoute, 
    private cartService:CartService,
    private router:Router
  ) { }
  food!:Foods

  ngOnInit() {
    this.route.params.subscribe((param) => {
      if(param['id']) {
        this.food = this.fs.getFoodById(param['id'])
        console.log(this.food)
      }
    })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }
}
