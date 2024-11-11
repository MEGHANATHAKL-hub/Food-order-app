import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNot]',
  standalone: true
})
export class AppNotDirective {

  constructor(private templatRef:TemplateRef<any>, private viewContainerRef:ViewContainerRef) { }
  @Input() set appNot(condition: boolean) {
    if (!condition) {
        this.viewContainerRef.createEmbeddedView(this.templatRef);
    } else {
        this.viewContainerRef.clear();        }
  }

}
