import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'position',
    'actions',
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  @Output() edit = new EventEmitter<number>();

  editEmployee(id: number): void {
    this.edit.emit(id);
  }
  ngOnInit(): void {
    this.loadEmployees(); // نستخدم الدالة الجديدة بدل الكود المباشر
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.employees = res;
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.employees = this.employees.filter((e) => e.id !== id);
    });
  }
}
