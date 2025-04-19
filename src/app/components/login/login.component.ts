import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/user-interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private apiUrl: string = 'https://simplekanbanbackend.onrender.com/auth';
  protected showAlert: boolean = false;
  protected alertMessage: string = '';
  protected alertType: string = '';

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
      if(res['status']==200){
        localStorage.setItem('token', res.token);
        this.authService.currentUserSignal.set(res);
        this.router.navigateByUrl('/dashboard');
      }
      else{
        this.showAlert = true;
        setInterval(()=>{
          this.showAlert = false;
        }, 4000);
        this.alertMessage = res['message'];
        this.alertType = 'danger';
      }
    })
  }
}
