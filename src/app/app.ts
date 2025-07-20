import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ مهم جدًا علشان يعرض الصفحات الديناميكية
  //template: `<router-outlet></router-outlet>`, // 👈 يخلي التطبيق يعرض الصفحات حسب الـ path
  template: `<router-outlet></router-outlet>`,
})
export class App {}
