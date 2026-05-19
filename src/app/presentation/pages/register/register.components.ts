import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormsModule, ReactiveFormsModule,
  FormBuilder, FormGroup, Validators, AbstractControl, FormControl
} from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.components.html',
  styleUrls: ['./register.components.css']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  serverError: string | null = null;
  isLoading = false;
  
  showPassword = false;
  
  
  passwordStrength = 0;
  strengthClass = 'strength-bar-0';
  strengthLabel = 'Muy débil';

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);  

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.name,
      lastName: this.lastName,
      email: this.email,      
      password: this.password,            
    });

    this.password.valueChanges.subscribe(value => {
      this.calculateStrength(value || '');
    });
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  calculateStrength(pwd: string): void {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    this.passwordStrength = score;
    switch(score) {
      case 0:
      case 1:
        this.strengthClass = 'strength-weak';
        this.strengthLabel = 'Débil';
        break;
      case 2:
        this.strengthClass = 'strength-fair';
        this.strengthLabel = 'Regular';
        break;
      case 3:
        this.strengthClass = 'strength-good';
        this.strengthLabel = 'Buena';
        break;
      case 4:
        this.strengthClass = 'strength-strong';
        this.strengthLabel = 'Fuerte';
        break;
      default:
        this.strengthClass = 'strength-weak';
        this.strengthLabel = 'Débil';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.serverError = null;
    
    this.authService?.register(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;    
        this.router?.navigate(['/login']);        
      },
      error: (err:any) => {
        this.isLoading = false;
        this.serverError = err.error.message;
      }
    })
  }
}