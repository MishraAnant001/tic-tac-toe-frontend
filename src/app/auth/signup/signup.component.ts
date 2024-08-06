import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private _toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // console.log(this.form.value);
      this.service.signupUser(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          this._toastService.success('User registered successfully');
          this.router.navigateByUrl('/auth/login');
        },
        error: (error: any) => {
          if (error.error) {
            this._toastService.error(error.error.message);
          } else {
            this._toastService.error(error.message);
          }
        },
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
