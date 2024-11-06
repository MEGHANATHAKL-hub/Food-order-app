import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import Foods from '../../shared/models/food';
import { CartItem } from '../../shared/models/CartItem';

fdescribe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPageComponent],
      providers: [
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the not-found message if cart is empty', ()=> {
    component.cart = { items: [], totalPrice: 0, totalCount: 0 };
    fixture.detectChanges();
    const NotFoundElement = fixture.debugElement.query(By.css('app-not-found'));
    expect(NotFoundElement).toBeTruthy();
    expect(NotFoundElement.nativeElement.textContent).toContain('Cart Page Is Empty!')
  })

  it('Should display cart items if the cart items has products', ()=> {
    component.cart = { items: [], totalPrice: 10, totalCount: 1 };
    let food:Foods = {
      id: 1,
      name: 'HoneyCake',
      price: 10,
      cookTime: '40-50',
      favorite : true,
      origins: ['Italy', 'Jermany', 'US'],
      stars: 4,
      imageUrl: '',
      tags: ['Fast Food', 'Pizaa', 'Cake']
    }
    component.cart.items.push(new CartItem(food))
    fixture.detectChanges();
    const itemElements = fixture.debugElement.queryAll(By.css('li'));
    expect(itemElements.length).toBe(1);
    expect(itemElements[0].nativeElement.textContent).toContain('HoneyCake')
    expect(itemElements[0].nativeElement.textContent).toContain('$10.00')
  })

  it('Should call ChangeQuntity when quantity is changed', ()=> {
    spyOn(component, 'changeQuantity');
    component.cart = { items: [], totalPrice: 10, totalCount: 1 };
    let food:Foods = {
      id: 1,
      name: 'HoneyCake',
      price: 10,
      cookTime: '40-50',
      favorite : true,
      origins: ['Italy', 'Jermany', 'US'],
      stars: 4,
      imageUrl: '',
      tags: ['Fast Food', 'Pizaa', 'Cake']
    }
    component.cart.items.push(new CartItem(food))
    fixture.detectChanges();

    const quantitySelect = fixture.debugElement.query(By.css('select')).nativeElement;
    quantitySelect.value = '2';
    quantitySelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.changeQuantity).toHaveBeenCalledWith(component.cart.items[0], '2')
  })

  it('Should call removeFromCart when remove button clicked', ()=> {
    spyOn(component, 'removeFromCart');
    component.cart = { items: [], totalPrice: 10, totalCount: 1 };
    let food:Foods = {
      id: 1,
      name: 'HoneyCake',
      price: 10,
      cookTime: '40-50',
      favorite : true,
      origins: ['Italy', 'Jermany', 'US'],
      stars: 4,
      imageUrl: '',
      tags: ['Fast Food', 'Pizaa', 'Cake']
    }
    component.cart.items.push(new CartItem(food))
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(By.css('.remove-button'));
    removeButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.removeFromCart).toHaveBeenCalledWith(component.cart.items[0])
  })

  it('Should display total count and price in the checkout section', ()=> {
    spyOn(component, 'removeFromCart');
    component.cart = { items: [], totalPrice: 10, totalCount: 1 };
    let food:Foods = {
      id: 1,
      name: 'HoneyCake',
      price: 10,
      cookTime: '40-50',
      favorite : true,
      origins: ['Italy', 'Jermany', 'US'],
      stars: 4,
      imageUrl: '',
      tags: ['Fast Food', 'Pizaa', 'Cake']
    }
    component.cart.items.push(new CartItem(food))
    fixture.detectChanges();

    const foodsCount = fixture.debugElement.query(By.css('.foods-count')).nativeElement;
    const totalPrice = fixture.debugElement.query(By.css('.total-price')).nativeElement;

    expect(foodsCount.textContent).toContain('1');
    expect(totalPrice.textContent).toContain('$10.00');
  })

  it('Should have link to proceed to checkout', ()=> {
    component.cart = { items: [], totalPrice: 10, totalCount: 1 };
    let food:Foods = {
      id: 1,
      name: 'HoneyCake',
      price: 10,
      cookTime: '40-50',
      favorite : true,
      origins: ['Italy', 'Jermany', 'US'],
      stars: 4,
      imageUrl: '',
      tags: ['Fast Food', 'Pizaa', 'Cake']
    }
    component.cart.items.push(new CartItem(food))
    fixture.detectChanges();

    const checkoutLink = fixture.debugElement.query(By.css('a[routerLink="/checkout"]'));
    expect(checkoutLink).toBeTruthy();
  })
});
