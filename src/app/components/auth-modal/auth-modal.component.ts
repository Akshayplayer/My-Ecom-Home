import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() authSuccess = new EventEmitter<void>();

  currentView: 'login' | 'signup' = 'login';

  onSwitchToSignup(): void {
    this.currentView = 'signup';
  }

  onSwitchToLogin(): void {
    this.currentView = 'login';
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onAuthSuccess(): void {
    this.authSuccess.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
