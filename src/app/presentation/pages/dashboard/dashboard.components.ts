import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.components.html',
  styleUrls: ['./dashboard.components.css'],
})
export class DashboardComponent implements OnInit {
  userName = '';
  userEmail = '';
  userInitials = '';

  repos: any[] = [];

  repoInput = '';
  isAnalyzing = false;
  metrics = [
    {
      label: 'Total repos',
      value: 0,
      icon: 'bi-folder2',
      suffix: '',
    },
    {
      label: 'Stars totales',
      value: 0,
      icon: 'bi-star',
      suffix: '',
    },
    {
      label: 'Forks totales',
      value: 0,
      icon: 'bi-git',
      suffix: '',
    },
  ];
  navItems = [
    { icon: 'bi-grid', label: 'Dashboard', route: '/dashboard', active: true },
    {
      icon: 'bi-folder2-open',
      label: 'Repositorios',
      route: '/dashboard',
      active: false,
    },
    {
      icon: 'bi-gear',
      label: 'Configuración',
      route: '/settings',
      active: false,
    },
  ];

  activityBars = [
    { label: 'Jan', value: 10, max: 40 },
    { label: 'Feb', value: 20, max: 40 },
    { label: 'Mar', value: 30, max: 40 },
    { label: 'Apr', value: 25, max: 40 },
    { label: 'May', value: 35, max: 40 },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data['user'];
    console.log('DATA DEL RESOLVER:', data);
    if (!data) return;

    this.repos = data;

    if (data.length > 0) {
      this.userName = data[0].owner.login;
      this.userEmail = data[0].owner.login;

      this.userInitials = this.userName.substring(0, 2).toUpperCase();
    }
  }

  formatStars(n: number): string {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n.toString();
  }

  analyzeRepo(): void {
    console.log(this.repoInput);
  }

  barHeightPercent(bar: any): number {
    if (!bar?.max) return 0;
    return Math.round((bar.value / bar.max) * 100);
  }
}
