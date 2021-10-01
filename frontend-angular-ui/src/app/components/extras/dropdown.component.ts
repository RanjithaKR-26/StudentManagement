import { Component } from '@angular/core';

@Component({
  selector: 'my-dropdown',
  template: `
    <div>Current value: {{ value | json }}</div>
    <div>
      <p>Favorite sport:</p>
      <kendo-multiselect
        [checkboxes]="true"
        [autoClose]="false"
        [data]="listItems"
        [(ngModel)]="value"
      ></kendo-multiselect>
    </div>
  `,
})
export class DropdownComponent {
  public listItems: Array<string> = [
    'Baseball',
    'Basketball',
    'Cricket',
    'Field Hockey',
    'Football',
    'Table Tennis',
    'Tennis',
    'Volleyball',
  ];
  public value: any = ['Baseball'];
}
