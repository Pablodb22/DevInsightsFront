import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.components.html',
  styleUrls: ['./login.components.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  serverError: string | null = null;
  showPassword = false;
  isLoading = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.email.invalid || this.password.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }
    this.isLoading = true;
    this.serverError = null;
    
    const body = {email: this.email.value, password: this.password.value};
    this.authService.login(body).subscribe({
        next:(response)=>{
          if(response.ok==true){
            this.isLoading = false;            
            localStorage.setItem('token', response.data);
            this.router.navigate(['/dashboard']);
          }else{
            this.isLoading = false;
            alert(response.message);            
          }       

        },
        error:(error)=>{
            this.isLoading = false;
            this.serverError = error.error.message;
        }
    })
  }
}