import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { Option } from '../../models/option';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'option-button',
  templateUrl: './option-button.component.html',
  styleUrls: ['./option-button.component.css']
})
export class OptionButtonComponent implements OnInit {

  @Input() options: Option[];
  @Input() value: Option;
  @Output() valueChange = new EventEmitter<Option>();

  optionButtonActive: boolean = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
  }

  private notifyChange(): void {
    let event = new Event('change', { bubbles: true });
    this.renderer.invokeElementMethod(this.element.nativeElement, 'dispatchEvent', [event]);
  }

  select(option: Option): void {
    this.value = option;
    this.valueChange.emit(this.value);
    this.notifyChange();
    this.optionButtonActive = !this.optionButtonActive;
  }

  optionButtonOnBlur(): void {
    setTimeout(() => {
      this.optionButtonActive = false;
    }, 250);
  }
}
