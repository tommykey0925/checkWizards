import { Routes } from '@angular/router';
import { WizardComponent } from './wizard/wizard.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'wizard', component: WizardComponent}
];
