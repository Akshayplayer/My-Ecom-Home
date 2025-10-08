import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * BehaviorSubject<User | null> currentUserSubject:
   *    - Holds the current authenticated user object or null if not logged in.
   *    - Allows components/services to subscribe and react to user authentication state changes.
   *
   * Observable<User | null> currentUser$:
   *    - Public observable stream of the current user.
   *    - Components can subscribe to this to get real-time updates when the user logs in or out.
   *
   * BehaviorSubject<boolean> isLoggedInSubject:
   *    - Holds the current login status (true if logged in, false otherwise).
   *    - Used internally to update and track authentication state.
   *
   * Observable<boolean> isLoggedIn$:
   *    - Public observable stream of the login status.
   *    - Components can subscribe to this to react to login/logout events.
   */
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check if user is already logged in (from localStorage)
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
      } catch (error) {
        // Clear invalid stored data
        this.logout();
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    // Simulate API call - in real app, this would be an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        // Mock validation - in real app, this would be server-side validation
        if (loginRequest.email === 'demo@navkarbesan.com' && loginRequest.password === 'password123') {
          const user: User = {
            id: '1',
            name: 'Demo User',
            email: loginRequest.email,
            phone: '+91 98765 43210',
            address: '123 Demo Street, Demo City',
            createdAt: new Date()
          };
          
          const token = 'mock-jwt-token-' + Date.now();
          
          // Store in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('authToken', token);
          
          // Update observables
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          
          observer.next({
            success: true,
            message: 'Login successful!',
            user: user,
            token: token
          });
        } else {
          observer.next({
            success: false,
            message: 'Invalid email or password. Try demo@navkarbesan.com / password123'
          });
        }
        observer.complete();
      }, 1000); // Simulate network delay
    });
  }

  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        // Mock validation
        if (signupRequest.password !== signupRequest.confirmPassword) {
          observer.next({
            success: false,
            message: 'Passwords do not match'
          });
          observer.complete();
          return;
        }

        if (signupRequest.password.length < 6) {
          observer.next({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
          observer.complete();
          return;
        }

        // Check if email already exists (mock)
        const existingUser = localStorage.getItem('user_' + signupRequest.email);
        if (existingUser) {
          observer.next({
            success: false,
            message: 'An account with this email already exists'
          });
          observer.complete();
          return;
        }

        // Create new user
        const user: User = {
          id: Date.now().toString(),
          name: signupRequest.name,
          email: signupRequest.email,
          phone: signupRequest.phone,
          address: signupRequest.address || '',
          createdAt: new Date()
        };

        const token = 'mock-jwt-token-' + Date.now();
        
        // Store user data and auth token
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        localStorage.setItem('user_' + signupRequest.email, JSON.stringify(user));
        
        // Update observables
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
        
        observer.next({
          success: true,
          message: 'Account created successfully!',
          user: user,
          token: token
        });
        observer.complete();
      }, 1500); // Simulate network delay
    });
  }

  logout(): void {
    // Clear stored data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    
    // Update observables
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
