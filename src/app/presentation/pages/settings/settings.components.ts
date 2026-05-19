import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormsModule, ReactiveFormsModule,
  FormBuilder, FormGroup, Validators, AbstractControl, FormControl
} from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.components.html',
  styleUrls: ['./settings.components.css']
})
export class SettingsComponent {
  // Estados de guardado
  savingProfile   = false;
  savedProfile    = false;
  savingPassword  = false;
  savedPassword   = false;
  savingToken     = false;
  savedToken      = false;

  showCurrentPwd  = false;
  showNewPwd      = false;
  showConfirmPwd  = false;
  showToken       = false;

  userInitials    = 'CL';

  // Formulario de perfil
  profileForm: FormGroup;

  // Formulario de seguridad
  securityForm: FormGroup;

  // Token de GitHub
  githubToken = '';
  tokenError  = '';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name:     ['Carlos',           [Validators.required, Validators.minLength(2)]],
      lastName: ['López García',     [Validators.required]],
      email:    ['carlos@ejemplo.com',[Validators.required, Validators.email]],
      location: ['Madrid, España',   []]
    });

    this.securityForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword:     ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordsMatch }
    );
  }

  // Getters perfil
  get name()     { return this.profileForm.get('name') as FormControl; }
  get lastName() { return this.profileForm.get('lastName') as FormControl; }
  get email()    { return this.profileForm.get('email') as FormControl; }
  get location() { return this.profileForm.get('location') as FormControl; }

  // Getters seguridad
  get currentPwd()  { return this.securityForm.get('currentPassword') as FormControl; }
  get newPwd()      { return this.securityForm.get('newPassword') as FormControl; }
  get confirmPwd()  { return this.securityForm.get('confirmPassword') as FormControl; }

  passwordsMatch(g: AbstractControl) {
    const nw = g.get('newPassword')?.value;
    const cf = g.get('confirmPassword')?.value;
    return nw === cf ? null : { mismatch: true };
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.savingProfile = true;
    // TODO: AuthService.updateProfile(this.profileForm.value)
    setTimeout(() => {
      this.savingProfile = false;
      this.savedProfile  = true;
      setTimeout(() => this.savedProfile = false, 2500);
    }, 900);
  }

  onSavePassword(): void {
    if (this.securityForm.invalid) { this.securityForm.markAllAsTouched(); return; }
    this.savingPassword = true;
    // TODO: AuthService.changePassword(...)
    setTimeout(() => {
      this.savingPassword = false;
      this.savedPassword  = true;
      this.securityForm.reset();
      setTimeout(() => this.savedPassword = false, 2500);
    }, 900);
  }

  onSaveToken(): void {
    if (!this.githubToken.trim()) {
      this.tokenError = 'El token no puede estar vacío.';
      return;
    }
    this.tokenError   = '';
    this.savingToken  = true;
    // TODO: GithubService.setToken(this.githubToken)
    setTimeout(() => {
      this.savingToken  = false;
      this.savedToken   = true;
      setTimeout(() => this.savedToken = false, 2500);
    }, 700);
  }
}