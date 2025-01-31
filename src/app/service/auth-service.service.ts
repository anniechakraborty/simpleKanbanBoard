import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  // Signal allows us to access the values inside it from different points in the application
  // Signal will notify all components to render
  currentUserSignal = signal<UserInterface | undefined | null>(undefined);
  // undefined - initial state
  // null - unauthorized
  // UserInterface - type of data that this signal will hold when the user is logged in
  
}
