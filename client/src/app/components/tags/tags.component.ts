import { Component, Input } from '@angular/core';
import Tag from '../../shared/models/Tag';
import { FoodService } from '../../services/food/food.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  @Input() foodPageTags?:string[];
  tags:Tag[] = []
  constructor(private fs:FoodService) { }
  ngOnInit() {
    if(!this.foodPageTags)
    this.tags = this.fs.getAllTags()
  }
}
