import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBlink]'
})
export class BlinkDirective {
  @Input() blinkCurrentValue: number;
  @Input() blinkStartValue: number;

  @HostBinding('class.blink')
  get elementClass() {
    return (this.blinkCurrentValue <= this.blinkStartValue);
  };
}
