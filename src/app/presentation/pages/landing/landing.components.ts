import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.components.html',
  styleUrls: ['./landing.components.css']
})
export class LandingComponent {
  features = [
    {
      icon: 'bi-bar-chart-line',
      title: 'Estadísticas detalladas',
      desc: 'Visualiza estrellas, forks, commits y lenguajes de cada repositorio en un solo lugar.'
    },
    {
      icon: 'bi-github',
      title: 'Conexión directa con GitHub',
      desc: 'Usa tu token personal de GitHub para acceder tanto a repositorios públicos como privados.'
    },
    {
      icon: 'bi-grid-1x2',
      title: 'Panel centralizado',
      desc: 'Gestiona todos tus repositorios desde un dashboard limpio, sin salir de la app.'
    }
  ];

  steps = [
    { num: '01', title: 'Crea tu cuenta', desc: 'Regístrate en segundos con tu email.' },
    { num: '02', title: 'Conecta GitHub',  desc: 'Añade tu token de acceso personal.' },
    { num: '03', title: 'Analiza repos',   desc: 'Añade repositorios y visualiza sus stats.' }
  ];

  currentYear = new Date().getFullYear();
}