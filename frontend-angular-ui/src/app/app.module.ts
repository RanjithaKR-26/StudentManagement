import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadsModule, UploadModule } from '@progress/kendo-angular-upload';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadInterceptor } from './app.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { EditorModule } from '@progress/kendo-angular-editor';
import { RichtextComponent } from './components/extras/richtext.component';
import { DropdownComponent } from './components/extras/dropdown.component';
import { PopoverComponent } from './components/extras/popover.component';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DatetimepickerComponent } from './components/extras/datetimepicker.component';
import { IntlModule } from '@progress/kendo-angular-intl';

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    RichtextComponent,
    DropdownComponent,
    PopoverComponent,
    DatetimepickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    GridModule,
    BrowserAnimationsModule,
    PopupModule,
    DropDownsModule,
    InputsModule,
    ButtonsModule,
    DialogsModule,
    LabelModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    UploadsModule,
    UploadModule,
    DateInputsModule,
    NotificationModule,
    EditorModule,
    TooltipModule,
    IntlModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
