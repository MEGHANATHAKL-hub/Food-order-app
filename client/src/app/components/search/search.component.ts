import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchItem:string = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit():void {
    this.route.params.subscribe((params:any) => {
      this.searchItem = params['searchItem']
    })
  }

  search() {
    if(this.searchItem)
      this.router.navigateByUrl('search/' + this.searchItem)
  }
}
