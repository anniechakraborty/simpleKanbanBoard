import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserInterface } from '../../interfaces/user-interface';


@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private apiUrl: string = 'https://api.realworld.io/api';

  registerForm = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient){}

  onSubmit(): void{
    console.log(this.registerForm.value);
    // Make API call to authenticate user
    // The response from this API is an object with the field user and the value in the interface structure
    this.http.post<{user: UserInterface}>(
      this.apiUrl + '/users',
      {
        user: this.registerForm.value
      }
    ).subscribe((res)=>{
      console.log('Registration response : ',res);
    })
  }
}
