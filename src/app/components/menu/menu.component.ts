import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(
    protected authService: AuthServiceService,
    private router: Router
  ) { }
  logout(): void{
    console.log('log out');
    localStorage.setItem('token', '');
    this.authService.currentUserSignal.set(null);
    this.router.navigateByUrl('/home');
  }
}
