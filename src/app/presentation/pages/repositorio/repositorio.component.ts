import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-repositorio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css'],
})
export class RepositorioComponent implements OnInit {
  repo: any = null;
  owner = '';
  repoName = '';
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');

    if (!owner || !repo) {
      this.error = 'No se encontró la información del repositorio.';
      this.isLoading = false;
      return;
    }

    this.owner = owner;
    this.repoName = repo;
    this.fetchRepository(owner, repo);
  }

  fetchRepository(owner: string, repo: string): void {
    this.isLoading = true;
    this.error = '';

    this.http
      .get<any>(`https://api.github.com/repos/${owner}/${repo}`)
      .subscribe({
        next: (data) => {
          this.repo = data;
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Hubo un error cargando los detalles del repositorio.';
          this.isLoading = false;
        },
      });
  }

  formatNumber(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }

  formatSize(sizeKb: number): string {
    if (!sizeKb && sizeKb !== 0) {
      return '-';
    }
    if (sizeKb >= 1024) {
      return `${(sizeKb / 1024).toFixed(1)} MB`;
    }
    return `${sizeKb} KB`;
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getDaysSince(dateValue: string): number {
    const date = new Date(dateValue);
    const diff = Date.now() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  getActivityLabel(): string {
    if (!this.repo?.pushed_at) {
      return 'Última actividad no disponible';
    }
    const days = this.getDaysSince(this.repo.pushed_at);
    if (days <= 7) {
      return `Muy activo · hace ${days} días`;
    }
    if (days <= 30) {
      return `Activo · hace ${days} días`;
    }
    return `Menos activo · hace ${days} días`;
  }

  getStarForkRatio(): string {
    const stars = this.repo?.stargazers_count || 0;
    const forks = this.repo?.forks_count || 0;
    if (!stars || !forks) {
      return 'N/A';
    }
    return `${(stars / forks).toFixed(1)} estrellas por fork`;
  }

  getHealthLabel(): string {
    const activeFeatures = [
      this.repo?.has_issues,
      this.repo?.has_projects,
      this.repo?.has_wiki,
      this.repo?.has_pages,
    ].filter(Boolean).length;
    if (activeFeatures >= 3) {
      return 'Repositorio bien configurado';
    }
    if (activeFeatures >= 1) {
      return 'Funcionalidades básicas activas';
    }
    return 'Pocas funcionalidades habilitadas';
  }

  getStatWidth(value: number): string {
    const max = Math.max(
      this.repo?.stargazers_count || 0,
      this.repo?.forks_count || 0,
      this.repo?.watchers_count || 0,
      this.repo?.subscribers_count || 0,
      1
    );
    return `${Math.round((value / max) * 100)}%`;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  openGitHub(): void {
    if (this.repo?.html_url) {
      window.open(this.repo.html_url, '_blank');
    }
  }
}
