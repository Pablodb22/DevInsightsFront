import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RepoCard, MetricCard, BarData } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.components.html',
  styleUrls: ['./dashboard.components.css']
})
export class DashboardComponent {
  userName     = 'Carlos López';
  userEmail    = 'carlos@ejemplo.com';
  userInitials = 'CL';
  repoInput    = '';
  isAnalyzing  = false;

  navItems = [
    { icon: 'bi-grid',         label: 'Dashboard',      route: '/dashboard', active: true  },
    { icon: 'bi-folder2-open', label: 'Repositorios',   route: '/dashboard', active: false },
    { icon: 'bi-bar-chart',    label: 'Estadísticas',   route: '/dashboard', active: false },
    { icon: 'bi-gear',         label: 'Configuración',  route: '/settings',  active: false },
  ];

  metrics: MetricCard[] = [
    { label: 'Total repos',       value: 24,         icon: 'bi-folder2',    suffix: '' },
    { label: 'Stars totales',     value: '1.3k',     icon: 'bi-star',       suffix: '' },
    { label: 'Forks totales',     value: 87,         icon: 'bi-git',        suffix: '' },
    { label: 'Lenguaje top',      value: 'TypeScript',icon: 'bi-code-slash', suffix: '' },
  ];

  repos: RepoCard[] = [
    {
      name: 'angular-dashboard',
      fullName: 'clopez/angular-dashboard',
      description: 'Panel de administración construido con Angular 17 y Bootstrap 5.',
      language: 'TypeScript',
      langColor: '#3178c6',
      stars: 312,
      forks: 45,
      lastCommit: 'hace 2 días',
      url: 'https://github.com'
    },
    {
      name: 'api-rest-node',
      fullName: 'clopez/api-rest-node',
      description: 'API REST con Express, JWT y PostgreSQL. Lista para producción.',
      language: 'JavaScript',
      langColor: '#f1e05a',
      stars: 198,
      forks: 31,
      lastCommit: 'hace 1 semana',
      url: 'https://github.com'
    },
    {
      name: 'ml-classifier',
      fullName: 'clopez/ml-classifier',
      description: 'Clasificador de imágenes con TensorFlow.js. Entrenado con CIFAR-10.',
      language: 'Python',
      langColor: '#3572A5',
      stars: 87,
      forks: 11,
      lastCommit: 'hace 3 semanas',
      url: 'https://github.com'
    },
    {
      name: 'css-components',
      fullName: 'clopez/css-components',
      description: 'Librería de componentes CSS puros sin dependencias externas.',
      language: 'CSS',
      langColor: '#563d7c',
      stars: 654,
      forks: 78,
      lastCommit: 'hace 5 días',
      url: 'https://github.com'
    },
    {
      name: 'DevInsights',
      fullName: 'clopez/DevInsights',
      description: 'La propia aplicación. Visualizador de estadísticas de GitHub.',
      language: 'TypeScript',
      langColor: '#3178c6',
      stars: 21,
      forks: 3,
      lastCommit: 'hoy',
      url: 'https://github.com'
    },
    {
      name: 'dotfiles',
      fullName: 'clopez/dotfiles',
      description: 'Mis archivos de configuración: zsh, vim, tmux, starship.',
      language: 'Shell',
      langColor: '#89e051',
      stars: 44,
      forks: 9,
      lastCommit: 'hace 1 mes',
      url: 'https://github.com'
    }
  ];

  // Datos ficticios para la gráfica de actividad (12 meses)
  activityBars: BarData[] = [
    { label: 'Jun', value: 18, max: 40 },
    { label: 'Jul', value: 30, max: 40 },
    { label: 'Ago', value: 22, max: 40 },
    { label: 'Sep', value: 35, max: 40 },
    { label: 'Oct', value: 28, max: 40 },
    { label: 'Nov', value: 40, max: 40 },
    { label: 'Dic', value: 12, max: 40 },
    { label: 'Ene', value: 25, max: 40 },
    { label: 'Feb', value: 33, max: 40 },
    { label: 'Mar', value: 38, max: 40 },
    { label: 'Abr', value: 29, max: 40 },
    { label: 'May', value: 20, max: 40 },
  ];

  analyzeRepo(): void {
    if (!this.repoInput.trim()) return;
    this.isAnalyzing = true;
    // TODO: llamar a GithubService.getRepo(this.repoInput)
    setTimeout(() => {
      this.isAnalyzing = false;
      this.repoInput   = '';
    }, 1200);
  }

  barHeightPercent(bar: BarData): number {
    return Math.round((bar.value / bar.max) * 100);
  }

  formatStars(n: number): string {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n.toString();
  }
}