import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  /**
   * Signal allows us to access the values inside it from different points in the application. 
   * It will notify all components to render the changes in the value.
   * 
   * Everytime we reload the application, signal becomes undefined. Or in other words, our user will get logged out. 
   * Hence, we need to relogin using the token saved in local storage everytime the application is loaded.
   * 
   * States:
   * - undefined : initial state
   * - null: unauthorized
   * - UserInterface : type of data that this signal will hold when the user is logged in
   */
  // 
  currentUserSignal = signal<UserInterface | undefined | null>(undefined);
  
}
