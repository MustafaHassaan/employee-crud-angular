import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent, EmployeeListComponent],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements AfterViewInit {
  selectedEmployeeId: number | null = null;

  @ViewChild(EmployeeListComponent, { static: false })
  listComponent!: EmployeeListComponent;

  ngAfterViewInit(): void {
    // ممكن نعمل refresh هنا لو حبيت في بداية الصفحة
  }

  onEdit(id: number): void {
    this.selectedEmployeeId = id;
  }

  onResetForm(): void {
    this.selectedEmployeeId = null;
  }

  onRefreshList(): void {
    // ضمان إن المكون اتحمل قبل النداء
    setTimeout(() => {
      if (this.listComponent) {
        this.listComponent.loadEmployees();
      }
    });
  }
}
