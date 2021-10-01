import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatetimepickerComponent } from './components/extras/datetimepicker.component';
import { DropdownComponent } from './components/extras/dropdown.component';
import { PopoverComponent } from './components/extras/popover.component';
import { RichtextComponent } from './components/extras/richtext.component';
import { StudentTableComponent } from './components/student-table/student-table.component';

const routes: Routes = [
  { path: '', component: StudentTableComponent, pathMatch: 'full' },
  { path: 'richtext', component: RichtextComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'popover', component: PopoverComponent },
  { path: 'datetimepicker', component: DatetimepickerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
