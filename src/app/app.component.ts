import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DevInsights';

  // Páginas donde NO se muestra la navbar (landing, login, register)
  hideNavbarRoutes = ['/', '/login', '/register'];
  showNavbar = false;

  // Estado del dropdown de usuario
  dropdownOpen = false;

  // Datos del usuario (vendrían del AuthService)
  userName  = 'Carlos López';
  userEmail = 'carlos@ejemplo.com';
  userInitials = 'CL';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showNavbar = !this.hideNavbarRoutes.includes(e.urlAfterRedirects);
        this.dropdownOpen = false;
      });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}