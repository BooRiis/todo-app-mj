import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appConfirmAction]'
})
export class ConfirmActionDirective {
  @Input('appConfirmAction') confirmMessage: string = 'Are you sure?';

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const confirmed = window.confirm(this.confirmMessage);
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
