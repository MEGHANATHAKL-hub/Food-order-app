import { Injectable } from '@angular/core';
import Foods from '../../shared/models/food';
import Tag from '../../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getFoodsByTags(tag:string):Foods[] {
    if(tag == 'All') return this.getAll()
    else return this.getAll().filter(food => food.tags?.includes(tag))
  }

  getFoodById(id:number):Foods {
    return this.getAll().find(food => food.id == id)!;
  }

  getAllTags():Tag[] {
    return [
      { name: 'All', count: 14 },
      { name: 'Fast Food', count: 4 },
      { name: 'Pizza', count: 2 },
      { name: 'Lunch', count: 3 },
      { name: 'Slow Food', count: 2 },
      { name: 'Hamburger', count: 1 },
      { name: 'Fry', count: 1 },
      { name: 'Soup', count: 1 },
    ]
  }

  getAll():Foods[] {
    return [
      {
        id: 1,
        name: 'HoneyCake',
        price: 10,
        cookTime: '40-50',
        favorite : true,
        origins: ['Italy', 'Jermany', 'US'],
        stars: 4,
        imageUrl: '/assets/images/food1.jpg',
        tags: ['Fast Food', 'Pizaa', 'Cake']
      },
      {
        id: 2,
        name: 'Egg Masala',
        price: 120,
        cookTime: '40-50',
        favorite : true,
        origins: ['Italy', 'France'],
        stars: 4,
        imageUrl: '/assets/images/food2.jpg',
        tags: ['Fast Food', 'Lunch']
      },
      {
        id: 3,
        name: 'Panner Butter Masala',
        price: 150,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy', 'India'],
        stars: 4,
        imageUrl: '/assets/images/food3.jpg',
        tags: ['Lunch']
      },
      {
        id: 4,
        name: 'Cake Red Rose',
        price: 50,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy'],
        stars: 4,
        imageUrl: '/assets/images/food4.jpg',
        tags: ['Fast Food', 'Pizaa']
      },
      {
        id: 5,
        name: 'Mango Masala',
        price: 70,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy'],
        stars: 4,
        imageUrl: '/assets/images/food5.jpg',
        tags: ['Fast Food','Lunch']
      },
      {
        id: 6,
        name: 'Tamoto Cake',
        price: 30,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy', 'India'],
        stars: 4,
        imageUrl: '/assets/images/food6.jpg',
        tags: ['Fast Food', 'Pizaa']
      },
      {
        id: 7,
        name: 'Tomato Roast',
        price: 200,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy', 'Mexicon'],
        stars: 4,
        imageUrl: '/assets/images/food7.jpg',
        tags: ['Fast Food', 'Lunch']
      },
      {
        id: 8,
        name: 'Cheesi Roti',
        price: 180,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy', 'Kolkata'],
        stars: 4,
        imageUrl: '/assets/images/food8.jpg',
        tags: ['Fast Food', 'Pizaa']
      },
      {
        id: 9,
        name: 'Sweets',
        price: 20,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy'],
        stars: 4,
        imageUrl: '/assets/images/food9.jpg',
        tags: ['Fast Food', 'Lunch']
      },
      {
        id: 10,
        name: 'Banaana Cake',
        price: 60,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy'],
        stars: 4,
        imageUrl: '/assets/images/food10.jpg',
        tags: ['Fast Food', 'Pizaa']
      },
      {
        id: 11,
        name: 'Kashmeeri Roti',
        price: 99,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy'],
        stars: 4,
        imageUrl: '/assets/images/food11.jpg',
        tags: ['Fast Food', 'Lunch']
      },
      {
        id: 12,
        name: 'Julebi',
        price: 90,
        cookTime: '40-50',
        favorite : false,
        origins: ['Italy'],
        stars: 4,
        imageUrl: '/assets/images/food12.jpg',
        tags: ['Fast Food', 'Sweet']
      },

    ]
  }
}
