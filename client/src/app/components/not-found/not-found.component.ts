import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Nothing Found!";
  @Input()
  resetLinkText = "Reset";
  @Input()
  resetLinkRoute = "/";
  constructor() { }
}
