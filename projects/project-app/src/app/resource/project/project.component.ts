// projects.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from 'projects/shared-lib/src/services/project.service';

// Interfaces
interface TeamMember {
  id: string;
  initials: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  dueDate: string;
  teamSize: number;
  tasksCompleted: number;
  totalTasks: number;
  teamMembers: TeamMember[];
}

interface Task {
  id: string;
  project: string;
  // otros campos de la tarea
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal para crear nuevo proyecto -->
    <div *ngIf="showNewProjectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-background rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button class="absolute top-2 right-2 text-muted-foreground hover:text-foreground" (click)="closeNewProjectModal()">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 class="text-xl font-bold mb-4">Nuevo Proyecto</h2>
        <form (ngSubmit)="submitNewProject()" #newProjectForm="ngForm">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Nombre</label>
            <input type="text" class="input w-full" required [(ngModel)]="newProject.name" name="name" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Descripción</label>
            <textarea class="input w-full" required [(ngModel)]="newProject.description" name="description"></textarea>
          </div>
          <div class="mb-4 flex gap-2">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Prioridad</label>
              <select class="select w-full" required [(ngModel)]="newProject.priority" name="priority">
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Estado</label>
              <select class="select w-full" required [(ngModel)]="newProject.status" name="status">
                <option value="active">Activo</option>
                <option value="planning">Planificación</option>
                <option value="completed">Completado</option>
                <option value="delayed">Retrasado</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Fecha de entrega</label>
            <input type="date" class="input w-full" required [(ngModel)]="newProject.dueDate" name="dueDate" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" class="btn btn-outline" (click)="closeNewProjectModal()">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="newProjectForm.invalid || loadingNewProject">{{ loadingNewProject ? 'Guardando...' : 'Crear' }}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="min-h-screen bg-background">
 
        
        <main class="flex-1 p-6">
          <div class="space-y-6">
            <!-- Header -->
            <div class="flex justify-between items-center">
              <h1 class="text-3xl font-bold text-foreground">Proyectos</h1>
              <button class="btn btn-primary" (click)="createNewProject()">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Nuevo Proyecto
              </button>
            </div>

            <!-- Filters -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  [(ngModel)]="searchTerm"
                  class="input pl-10"
                />
              </div>
              
              <select [(ngModel)]="statusFilter" class="select w-[180px]">
                <option value="all">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="planning">Planificación</option>
                <option value="completed">Completado</option>
                <option value="delayed">Retrasado</option>
              </select>
              
              <select [(ngModel)]="priorityFilter" class="select w-[180px]">
                <option value="all">Todas las prioridades</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                *ngFor="let project of filteredProjects" 
                class="card gradient-card border-border/50 shadow-enterprise hover:shadow-primary transition-smooth"
              >
                <div class="card-header space-y-2">
                  <div class="flex justify-between items-start">
                    <h3 class="card-title text-lg font-semibold text-foreground line-clamp-1">
                      {{ project.name }}
                    </h3>
                    <div class="flex gap-2">
                      <span [class]="'badge ' + getStatusColor(project.status)">
                        {{ project.status }}
                      </span>
                      <span [class]="'badge ' + getPriorityColor(project.priority)">
                        {{ project.priority }}
                      </span>
                    </div>
                  </div>
                  <p class="text-sm text-muted-foreground line-clamp-2">
                    {{ project.description }}
                  </p>
                </div>
                
                <div class="card-content space-y-4">
                  <!-- Progress -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-muted-foreground">Progreso</span>
                      <span class="font-medium text-foreground">{{ project.progress }}%</span>
                    </div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        [style.width.%]="project.progress"
                      ></div>
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center gap-2">
                      <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-muted-foreground">Entrega:</span>
                      <span class="font-medium text-foreground">{{ project.dueDate }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                      </svg>
                      <span class="text-muted-foreground">Equipo:</span>
                      <span class="font-medium text-foreground">{{ project.teamSize }}</span>
                    </div>
                  </div>

                  <!-- Tasks Progress -->
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Tareas:</span>
                    <span class="font-medium text-foreground">
                      {{ project.tasksCompleted }} / {{ project.totalTasks }}
                    </span>
                  </div>

                  <!-- Team Members -->
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-muted-foreground">Equipo:</span>
                    <div class="flex -space-x-2">
                      <div 
                        *ngFor="let member of project.teamMembers.slice(0, 3)"
                        class="avatar w-6 h-6 border-2 border-background"
                      >
                        <img 
                          *ngIf="member.avatar" 
                          [src]="member.avatar" 
                          [alt]="member.initials"
                          class="w-full h-full rounded-full object-cover"
                        />
                        <span 
                          *ngIf="!member.avatar" 
                          class="avatar-fallback text-xs"
                        >
                          {{ member.initials }}
                        </span>
                      </div>
                      <div 
                        *ngIf="project.teamMembers.length > 3"
                        class="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center"
                      >
                        <span class="text-xs text-muted-foreground">
                          +{{ project.teamMembers.length - 3 }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex gap-2 pt-2">
                    <button 
                      class="btn btn-outline flex-1" 
                      (click)="viewProjectDetails(project)"
                    >
                      Ver Detalles
                    </button>
                    <button 
                      class="btn btn-outline"
                      (click)="viewProjectStats(project)"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div 
              *ngIf="filteredProjects.length === 0" 
              class="text-center py-12"
            >
              <p class="text-muted-foreground">
                No se encontraron proyectos que coincidan con los filtros.
              </p>
            </div>
          </div>
        </main>
    </div>

  `,
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  searchTerm: string = '';
  statusFilter: string = 'all';
  priorityFilter: string = 'all';

  projects: Project[] = [];

  showNewProjectModal = false;
  loadingNewProject = false;
  newProject: Partial<Project> = {
    name: '',
    description: '',
    priority: 'medium',
    status: 'planning',
    dueDate: ''
  };

  tasks: Task[] = [
    { id: 't1', project: 'Portal Web' },
    { id: 't2', project: 'Portal Web' },
    { id: 't3', project: 'App Móvil' },
    { id: 't4', project: 'Integración API' },
    { id: 't5', project: 'Portal Web' },
    { id: 't6', project: 'App Móvil' }
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
  }

  get filteredProjects(): Project[] {
    return this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || project.status === this.statusFilter;
      const matchesPriority = this.priorityFilter === 'all' || project.priority === this.priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'planning': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'delayed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  }

  getProjectTasks(projectName: string): Task[] {
    return this.tasks.filter(task => task.project === projectName);
  }


  createNewProject(): void {
    this.resetNewProjectForm();
    this.showNewProjectModal = true;
  }

  closeNewProjectModal(): void {
    this.showNewProjectModal = false;
  }

  resetNewProjectForm(): void {
    this.newProject = {
      name: '',
      description: '',
      priority: 'medium',
      status: 'planning',
      dueDate: ''
    };
    this.loadingNewProject = false;
  }

  submitNewProject(): void {
    if (!this.newProject.name || !this.newProject.description || !this.newProject.priority || !this.newProject.status || !this.newProject.dueDate) {
      return;
    }
    this.loadingNewProject = true;
    // Convertir dueDate a formato ISO 8601 si es string yyyy-MM-dd
    let payload = { ...this.newProject };
    if (typeof payload.dueDate === 'string' && payload.dueDate.length === 10) {
      // yyyy-MM-dd → yyyy-MM-ddT00:00:00.000Z
      payload.dueDate = new Date(payload.dueDate + 'T00:00:00.000Z').toISOString();
    }
    this.projectService.createProject(payload).subscribe({
      next: (createdProject: Project) => {
        this.projects.push(createdProject);
        this.closeNewProjectModal();
        this.loadingNewProject = false;
      },
      error: (err) => {
        // Manejo de error
        alert('Error al crear el proyecto');
        this.loadingNewProject = false;
      }
    });
  }

  viewProjectDetails(project: Project): void {
    // Navegación a detalles del proyecto
    console.log('Ver detalles del proyecto:', project.name);
  }

  viewProjectStats(project: Project): void {
    // Mostrar estadísticas del proyecto
    console.log('Ver estadísticas del proyecto:', project.name);
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects.map(p => ({
        id: p.projectId,
        name: p.name,
        description: p.description,
        status: p.status,
        priority: p.priority,
        progress: p.progress,
        dueDate: p.dueDate,
        teamSize: p.teamSize,
        tasksCompleted: p.tasksCompleted,
        totalTasks: p.totalTasks,
        teamMembers: p.teamMembers || []
      }));
    });
  }
  
  private loadTasks(): void {
    // Aquí cargarías las tareas desde un servicio
    // this.taskService.getTasks().subscribe(tasks => {
    //   this.tasks = tasks;
    // });
  }
}