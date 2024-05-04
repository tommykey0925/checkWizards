import { Component } from '@angular/core';
import { GryffindorService } from '../gryffindor.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent {
setWizard() {
throw new Error('Method not implemented.');
}
  constructor(public wizard: GryffindorService) {}

  setClass () :string {
    return this.wizard.wizard.ancestry == 'pure-blood' ? 'pureBlooded' : 'notPureBlooded';
  }
}
