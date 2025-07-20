import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employeeId: number | null = null;
  @Output() formReset = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId'] && this.employeeId) {
      this.employeeService.getById(this.employeeId).subscribe((emp) => {
        this.form.patchValue(emp);
        Object.keys(this.form.controls).forEach((key) => {
          const control = this.form.get(key);
          if (control) {
            control.markAsPristine();
            control.markAsUntouched();
            control.updateValueAndValidity();
          }
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const employeeData = this.form.value as Employee;

    if (this.employeeId) {
      employeeData.id = this.employeeId;
    }

    const request$: Observable<any> = this.employeeId
      ? this.employeeService.update(this.employeeId, employeeData)
      : this.employeeService.create(employeeData);

    request$.subscribe({
      next: () => {
        this.clearForm();
        this.employeeId = null;
        this.refreshList.emit();

        this.snackBar.open('✅ Done Saved Success', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'], // ممكن تضيفها في CSS
        });
      },
      error: (err: any) => {
        console.error('❌ Fail In Saved Data:', err);

        this.snackBar.open('❌ Fail save pleas try again', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'], // ممكن تعملها لون أحمر مثلًا
        });
      },
    });
  }

  clearForm(): void {
    this.employeeId = null;

    // 1. reset القيم بـ null بدل ''
    const resetObj: any = {};
    Object.keys(this.form.controls).forEach((key) => {
      resetObj[key] = null;
    });

    this.form.reset(resetObj);

    // 2. نرجع الفورم كأنه لسه جديد
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();

    // 3. حركة مضمونة: نعمل reset للـ HTML form كمان (لو لسه المشكلة مستمرة)
    const nativeForm = document.querySelector('form');
    if (nativeForm) nativeForm.reset();

    this.formReset.emit();
  }
}
