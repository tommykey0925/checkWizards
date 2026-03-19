import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GryffindorService } from '../gryffindor.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent {
  imgFailed = false;

  constructor(public svc: GryffindorService) {}

  onImgError() {
    this.imgFailed = true;
  }

  get houseColor(): string {
    const colors: Record<string, string> = {
      Gryffindor: '#ae0001',
      Slytherin: '#1a472a',
      Ravenclaw: '#0e1a40',
      Hufflepuff: '#ecb939'
    };
    return colors[this.svc.wizard.house] ?? '#444';
  }

  get houseBg(): string {
    const colors: Record<string, string> = {
      Gryffindor: 'rgba(174, 0, 1, 0.12)',
      Slytherin: 'rgba(26, 71, 42, 0.12)',
      Ravenclaw: 'rgba(14, 26, 64, 0.12)',
      Hufflepuff: 'rgba(236, 185, 57, 0.12)'
    };
    return colors[this.svc.wizard.house] ?? 'rgba(255,255,255,0.05)';
  }
}
