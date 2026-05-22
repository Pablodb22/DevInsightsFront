import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormsModule, ReactiveFormsModule,
  FormBuilder, FormGroup, Validators, AbstractControl, FormControl
} from '@angular/forms';
import { UserService } from '../../../data/services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.components.html',
  styleUrls: ['./settings.components.css']
})
export class SettingsComponent implements OnInit {

  private UserService=inject(UserService);

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

  //Error
  errorProfile  = '';
  errorPassword = '';
  errorToken    = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      name:     ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email:    ['', [Validators.required, Validators.email]],
      location: ['', []]
    });

    this.securityForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword:     ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.profileForm.patchValue({
          name: user.name || '',
          lastName: user.lastName || '',
          email: user.email || '',
          location: user.location || ''
        });

        this.githubToken = user.githubToken || '';

        const firstLetter = user.name?.[0] || '';
        const secondLetter = user.lastName?.[0] || '';
        this.userInitials = (firstLetter + secondLetter).toUpperCase() || 'CL';
      }
    });
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


  onSaveProfile(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.savingProfile = true;    

    const data={
      name: this.name.value,
      lastName: this.lastName.value,
      email: this.email.value,
      location: this.location.value
    }

    this.UserService.updateUser(data).subscribe({
      next: (response) => {
        console.log('Perfil actualizado:', response);
        this.savingProfile = false;
        this.savedProfile  = true;
      },
      error: (error) => {
        this.savingProfile = false;
        this.savedProfile  = false;
        this.errorProfile  = error.error?.message || 'Error al guardar el perfil.';
      }
    });                
  }

  onSavePassword(): void {
    if (this.securityForm.invalid) { this.securityForm.markAllAsTouched(); return; }
    this.savingPassword = true;    
    
    const data={
      email: this.email.value,
      currentPassword: this.currentPwd.value,
      newPassword: this.newPwd.value,
      confirmPassword: this.confirmPwd.value,      
    }

    this.UserService.updatePass(data).subscribe({
      next: (response) => {
        console.log('Contraseña actualizada:', response);
         this.savingPassword = false;
         this.savedPassword  = true;
         this.securityForm.reset();
      },
      error: (error) => {
        this.savingPassword = false;
        this.savedPassword  = false;
        this.errorPassword  = error.error?.message || 'Error al guardar la contraseña.';
      }
    });
     
      
  }

  onSaveToken(): void {
    if (!this.githubToken.trim()) {
      this.tokenError = 'El token no puede estar vacío.';
      return;
    }
    this.tokenError   = '';
    this.savingToken  = true;
    
    const data={
      email: this.email.value,
      githubToken: this.githubToken.trim()
    }

    this.UserService.updateToken(data).subscribe({
      next: (response) => {
        console.log('Token actualizado:', response);
        this.savingToken = false;
        this.savedToken  = true;
      },
      error: (error) => {
        this.savingToken = false;
        this.savedToken  = false;
        this.tokenError  = error.error?.message || 'Error al guardar el token.';
      }
    });
      
      
  }
}