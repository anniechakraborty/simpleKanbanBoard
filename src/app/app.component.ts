import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './service/auth-service.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    LoginComponent,
    RegisterComponent,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'simpleKanbanBoard';
  private apiUrl: string = 'https://simplekanbanbackend.onrender.com/auth';
  constructor (
    private http: HttpClient,
    private authService: AuthServiceService,
  ){}
  // Get current user to verify a user is logged or not
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token){
      this.http.get(
        this.apiUrl + '/user', 
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      ).subscribe((res: any) => {
        // console.log('User response : ', res);
        if(res.status === 200) {
          // If user is authenticated, set the user data in the service
          this.authService.currentUserSignal.set(res);
        }
        else {
          console.log('User not found / authenticated');
          this.authService.currentUserSignal.set(null);
        }
      });
    }
    else{
      console.log('Token empty!')
    }
  }
}
