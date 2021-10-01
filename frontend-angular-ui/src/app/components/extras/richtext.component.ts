import { Component } from '@angular/core';

@Component({
  selector: 'my-richtext',
  template: `<kendo-editor [value]="value" style="height: 400px;">
    <kendo-editor-messages
      bold="This tool bolds the text"
      italic="This tool makes the text italic"
      underline="This tool underlines the text"
    >
    </kendo-editor-messages>
  </kendo-editor> `,
})
export class RichtextComponent {
  public value = `
        <p>
            The Kendo Angular UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
            In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks and lists.
            The widget <strong>outputs identical HTML</strong> across all major browsers, follows
            accessibility standards, and provides API for content manipulation.
        </p>
        <p>Features include:</p>
        <ul>
            <li>Text formatting</li>
            <li>Bulleted and numbered lists</li>
            <li>Hyperlinks</li>
            <li>Cross-browser support</li>
            <li>Identical HTML output across browsers</li>
        </ul>
    `;
}
