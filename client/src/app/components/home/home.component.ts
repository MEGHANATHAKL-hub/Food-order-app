import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food/food.service';
import { NgFor, CurrencyPipe } from '@angular/common';
import Foods from '../../shared/models/food';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // Components
    SearchComponent,
    TagsComponent,

    // Dependencies
    NgFor, 
    StarRatingModule, 
    MatIconModule, 
    CurrencyPipe, 
    FormsModule,
    RouterModule,
  ],
  providers: [StarRatingConfigService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  foods:Foods[] = []

  constructor(private fs:FoodService, private route: ActivatedRoute) {}

  ngOnInit():void {
    this.route.params.subscribe((params) => {
      if(params['searchItem']) {
        this.foods = this.fs.getAll().filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()))
      } else if (params['tag']) {
        this.foods = this.fs.getFoodsByTags(params['tag'])
      } else {
        this.foods = this.fs.getAll()
      }
    })
  }
}
