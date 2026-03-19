import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WizardComponent } from './wizard/wizard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wizard', component: WizardComponent }
];
