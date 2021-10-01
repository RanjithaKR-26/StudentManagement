import { Component } from '@angular/core';

@Component({
  selector: 'my-popover',
  template: `
    <div
      kendoTooltip
      filter=".dance"
      [titleTemplate]="titleTemplate"
      [tooltipTemplate]="template"
      position="right"
    >
      <ng-template #titleTemplate let-anchor>
        {{ anchor.nativeElement.getAttribute('data-name') }}
      </ng-template>
      <ng-template #template let-anchor>
        {{ anchor.nativeElement.getAttribute('data-description') }}
      </ng-template>

      <h2>List of dances</h2>
      <ul *ngFor="let dance of dances">
        <li
          class="dance"
          [attr.data-name]="dance.danceName"
          [attr.data-description]="dance.description"
        >
          {{ dance.danceName }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
        padding-left: 0;
      }

      li {
        padding: 5px;
        border: 1px solid #ff6757;
        color: #ff6757;
        width: 100px;
        text-align: center;
        border-radius: 5px;
      }
    `,
  ],
})
export class PopoverComponent {
  public dances = [
    {
      danceName: 'Tango',
      description:
        'Tango is a partner dance which originated in the 1880s along the River Plate, the natural border between Argentina and Uruguay.',
    },
    {
      danceName: 'Flamenco',
      description: `Flamenco is a Spanish art form made up of three parts: guitar playing ('guitarra'), song ('cante'), and dance ('baile').`,
    },
    {
      danceName: 'Pasodoble',
      description:
        'Pasodoble (Spanish: double step) is Spanish a dance that emulates the movements of a bullfight.',
    },
  ];
}
