
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  // Datos para los KPIs
  kpis = [
    {
      title: 'Proyectos Activos',
      value: 2,
      change: '+16.7%',
      icon: 'folder',
      sub: '+2 este mes',
      color: 'success'
    },
    {
      title: 'Tareas Completadas',
      value: 1,
      change: '+8.2%',
      icon: 'check',
      sub: 'Esta semana',
      color: 'primary'
    },
    {
      title: 'Miembros del Equipo',
      value: 32,
      change: '+12.5%',
      icon: 'users',
      sub: 'Activos',
      color: 'info'
    },
    {
      title: 'Entregas Pendientes',
      value: 5,
      change: '-20%',
      icon: 'calendar',
      sub: 'Próximos 7 días',
      color: 'danger'
    }
  ];

  // Proyectos activos (cards)
  activeProjects = [
    {
      name: 'Website Redesign',
      description: 'Rediseño completo del sitio web corporativo con nueva identidad...',
      status: 'Active',
      priority: 'High',
      progress: 75,
      dueDate: '15 Feb',
      teamSize: 6,
      tasks: '18/24'
    },
    {
      name: 'Mobile App Development',
      description: 'Desarrollo de aplicación móvil nativa para iOS y Android',
      status: 'Active',
      priority: 'High',
      progress: 40,
      dueDate: '30 Mar',
      teamSize: 8,
      tasks: '12/30'
    },
    {
      name: 'API Migration',
      description: 'Migración de APIs legacy a nueva arquitectura de microservicios',
      status: 'Planning',
      priority: 'Medium',
      progress: 60,
      dueDate: '20 Feb',
      teamSize: 4,
      tasks: '15/25'
    }
  ];

  // Tareas por mes (bar chart)
  tasksPerMonth = [
    { month: 'Ene', value: 7 },
    { month: 'Feb', value: 14 },
    { month: 'Mar', value: 15 },
    { month: 'Abr', value: 21 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 28 }
  ];

  // Tablero de tareas (kanban)
  kanban = [
    {
      title: 'Por Hacer',
      tasks: [
        {
          title: 'Diseñar mockups de login',
          desc: 'Crear diseños para las pantallas de autenticación',
          user: { initials: 'MG', name: 'María García' },
          project: 'Website Redesign',
          date: 'Hoy',
          flag: true
        },
        {
          title: 'Setup base de datos',
          desc: 'Configurar esquemas de BD para el nuevo sistema',
          user: { initials: 'CL', name: 'Carlos López' },
          project: 'API Migration',
          date: 'Mañana',
          flag: true
        }
      ]
    },
    {
      title: 'En Progreso',
      tasks: [
        {
          title: 'Implementar autenticación JWT',
          desc: 'Desarrollar sistema de auth con tokens JWT',
          user: { initials: 'AR', name: 'Ana Ruiz' },
          project: 'Mobile App',
          date: '3 días',
          flag: false
        }
      ]
    },
    {
      title: 'En Revisión',
      tasks: [
        {
          title: 'Review de UI components',
          desc: 'Revisión de componentes reutilizables',
          user: { initials: 'PS', name: 'Pedro Sánchez' },
          project: 'Website Redesign',
          date: '2 días',
          flag: false
        }
      ]
    },
    {
      title: 'Completadas',
      tasks: [
        {
          title: 'Configurar CI/CD pipeline',
          desc: 'Pipeline automatizado implementado',
          user: { initials: 'LM', name: 'Laura Martínez' },
          project: 'API Migration',
          date: 'Completado',
          flag: false
        }
      ]
    }
  ];

  // Pie chart de estado de tareas
  taskStatusPie = [
    { label: 'En Progreso', value: 20, color: '#3b82f6' },
    { label: 'Completadas', value: 20, color: '#2563eb' },
    { label: 'En Revisión', value: 20, color: '#fbbf24' },
    { label: 'Pendientes', value: 40, color: '#22c55e' }
  ];

  pendingTasks = 3;
  // Métodos para el SVG Pie Chart
  // Métodos para el SVG Pie Chart
  getPieDashArray(index: number): string {
    const total = this.taskStatusPie.reduce((sum, s) => sum + s.value, 0);
    const value = this.taskStatusPie[index].value;
    const percent = value / total;
    const circumference = 2 * Math.PI * 16;
    return `${percent * circumference} ${circumference}`;
  }

  getPieDashOffset(index: number): string {
    const total = this.taskStatusPie.reduce((sum, s) => sum + s.value, 0);
    const circumference = 2 * Math.PI * 16;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.taskStatusPie[i].value / total;
    }
    return `${-offset * circumference}`;
  }
}
