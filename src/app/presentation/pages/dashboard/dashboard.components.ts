import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

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
  totalRepos = 0;
  starsTotal = 0;
  forksTotal = 0;

  repoInput = '';
  searchError = '';
  isAnalyzing = false;
  showUserMenu = false;

  metrics = [
    { label: 'Total repos', value: 0, icon: 'bi-folder2', suffix: '' },
    { label: 'Stars totales', value: 0, icon: 'bi-star', suffix: '' },
    { label: 'Forks totales', value: 0, icon: 'bi-git', suffix: '' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data['user'];
    console.log('DATA DEL RESOLVER:', data);
    if (!data) return;

    this.repos = data;
    this.totalRepos = data.length;
    this.starsTotal = this.repos.reduce(
      (sum, repo) => sum + this.getRepoStars(repo),
      0
    );
    this.forksTotal = this.repos.reduce(
      (sum, repo) => sum + this.getRepoForks(repo),
      0
    );
    this.metrics[0].value = this.totalRepos;
    this.metrics[1].value = this.starsTotal;
    this.metrics[2].value = this.forksTotal;

    if (data.length > 0) {
      this.userName = data[0].owner.login;
      this.userEmail = data[0].owner.login;
      this.userInitials = this.userName.substring(0, 2).toUpperCase();
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    localStorage.removeItem('github_token');
    this.router.navigate(['/login']);
  }

  goToSettings(): void {
    this.showUserMenu = false;
    this.router.navigate(['/settings']);
  }

  formatStars(n: number): string {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n.toString();
  }

  getRepoStars(repo: any): number {
    return repo.stargazers_count ?? repo.stargazers ?? repo.stars ?? 0;
  }

  getRepoForks(repo: any): number {
    return repo.forks_count ?? repo.forks ?? 0;
  }

  navigateToRepo(owner: string, repoName: string): void {
    this.router.navigate(['/repositorio', owner, repoName]);
  }

  analyzeRepo(): void {
    const repo = this.repoInput.trim();
    if (!repo) {
      this.searchError = 'Introduce un repositorio en formato usuario/repositorio.';
      return;
    }

    const [owner, repoName] = repo.split('/').map((part) => part.trim());
    if (!owner || !repoName) {
      this.searchError = 'Formato inválido. Debe ser usuario/repositorio.';
      return;
    }

    this.searchError = '';
    this.router.navigate(['/repositorio', owner, repoName]);
  }

  barHeightPercent(bar: any): number {
    if (!bar?.max) return 0;
    return Math.round((bar.value / bar.max) * 100);
  }
}