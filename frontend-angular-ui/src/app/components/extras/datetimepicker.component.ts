import { Component } from '@angular/core';

@Component({
  selector: 'my-datetimepicker',
  template: `
    <div class="example-config">
      Selected value is: {{ value | date: format }}
    </div>
    <div class="example-wrapper">
      <p>Select date and time:</p>
      <kendo-datetimepicker [format]="format" [(value)]="value">
      </kendo-datetimepicker>
      <p>
        (use Alt + ↓ to open the calendar, Alt + ← and Alt + → to change the
        tabs)
      </p>
    </div>
  `,
})
export class DatetimepickerComponent {
  public value: Date = new Date(2019, 5, 1, 22);
  public format = 'MM/dd/yyyy HH:mm';
}
