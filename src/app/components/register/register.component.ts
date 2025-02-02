import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserInterface } from '../../interfaces/user-interface';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private apiUrl: string = 'http://127.0.0.1:5000/auth';
  protected showAlert: boolean = false;
  protected alertMessage: string = '';
  protected alertType: string = '';

  protected registerForm = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(
    private http: HttpClient, 
    private authService: AuthServiceService,
    private router: Router
  ){}

  onSubmit(): void{
    console.log(this.registerForm.value);
    // Make API call to authenticate user
    // The response from this API is an object with the field user and the value in the interface structure
    this.http.post(
      this.apiUrl + '/register',
      this.registerForm.value
    ).subscribe((res: any)=>{
      console.log('Registration response : ',res);
      if(res['status']===200){
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
