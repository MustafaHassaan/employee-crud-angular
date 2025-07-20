import { Routes } from '@angular/router';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';

export const routes: Routes = [
  //{ path: '', component: EmployeeListComponent },
  { path: '', component: EmployeePageComponent },
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
];
