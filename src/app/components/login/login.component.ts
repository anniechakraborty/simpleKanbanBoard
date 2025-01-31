import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/user-interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private apiUrl: string = 'http://127.0.0.1:5000/auth';
  constructor(
    private http: HttpClient, 
    private authService: AuthServiceService,
    private router: Router
  ){}
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void{
    console.log(this.form.value);
    // Make API call to authenticate user
    this.http.post(
      this.apiUrl + '/login',
      this.form.value
    ).subscribe((res: any)=>{
      console.log('Login response : ',res);
      localStorage.setItem('token', res.token);
      this.authService.currentUserSignal.set(res);
      this.router.navigateByUrl('/dashboard');
    })
  }
}
