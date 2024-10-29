import { Component } from '@angular/core';
import { FoodService } from '../../services/food/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Foods from '../../shared/models/food';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    NgFor,
    MatIconModule, 
    CurrencyPipe, 
    FormsModule,
    RouterModule,
    TagsComponent
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss'
})
export class FoodPageComponent {
  constructor(private fs:FoodService, private route:ActivatedRoute) { }
  food!:Foods

  ngOnInit() {
    this.route.params.subscribe((param) => {
      if(param['id']) {
        this.food = this.fs.getFoodById(param['id'])
        console.log(this.food)
      }
    })
  }
}
