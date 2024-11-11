import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../shared/models/Cart';
import { CartItem } from '../../shared/models/CartItem';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HighlightDirectiveDirective } from '../../directive/highlight-directive.directive';
import { AppNotDirective } from '../../directive/app-not.directive';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CurrencyPipe,
    CapitalizePipe,
    RouterModule,
    NotFoundComponent,
    HighlightDirectiveDirective,
    AppNotDirective
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cart!:Cart;
  constructor(private cartService:CartService) {
    this.setCart()
  }

  setCart() {
    this.cart = this.cartService.getCart()
  }
  removeFromCart(cartItem:CartItem) {
    this.cartService.removeFromCart(cartItem.food.id)
    this.setCart()
  }
  changeQuantity(cartItem:CartItem, quntityInString:string) {
    const quantity = parseInt(quntityInString)
    this.cartService.changeQuantity(cartItem.food.id, quantity)
    this.setCart()
  }
}
