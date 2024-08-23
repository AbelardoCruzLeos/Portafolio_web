import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent {
  skills: { name: string, level: string, type: string, progress: number }[] = [
    { name: 'HTML', level: 'Avanzado', type: 'Front-End', progress: 90 },
    { name: 'CSS', level: 'Avanzado', type: 'Front-End', progress: 85 },
    { name: 'JavaScript', level: 'Avanzado', type: 'Front-End', progress: 80 },
    { name: 'Bootstrap', level: 'Intermedio', type: 'Front-End', progress: 70 },
    { name: 'Angular', level: 'Intermedio', type: 'Front-End', progress: 75 },
    { name: 'Java/Spring Boot', level: 'Avanzado', type: 'Back-End', progress: 90 },
    { name: 'c#', level: 'Intermedio', type: 'Back-End', progress: 85 },
    { name: 'java', level: 'Intermedio', type: 'Back-End', progress: 85 },
    { name: 'Microsoft SQL Server', level: 'Avanzado', type: 'Back-End', progress: 85 },
    { name: 'MySQL', level: 'Intermedio', type: 'Back-End', progress: 75 },
    { name: 'Python', level: 'Básico', type: 'Back-End', progress: 60 },
  ];

  strengths: { name: string, description: string, progress: number }[] = [
    { name: 'Colaborativo', description: 'Capaz de trabajar en equipo', progress: 90 },
    { name: 'Comunicación', description: 'Buena comunicación verbal y escrita', progress: 85 },
    { name: 'Empático', description: 'Capacidad para entender y compartir sentimientos', progress: 80 },
    { name: 'Autodidacta', description: 'Capacidad para aprender por cuenta propia', progress: 95 },
  ];

  constructor() { }

  getSkillsByType(type: string) {
    return this.skills.filter(skill => skill.type === type);
  }
}
