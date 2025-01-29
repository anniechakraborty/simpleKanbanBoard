import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // fb = inject(FormBuilder);
  // form = this.fb.nonNullable.group({
  //   email: ['', Validators.required],
  //   userName: ['', Validators.required],
  //   password: ['', Validators.required],
  // });
  registerForm = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  onSubmit(): void{
    console.log(this.registerForm.value);
    // Make API call to authenticate user
  }
}
