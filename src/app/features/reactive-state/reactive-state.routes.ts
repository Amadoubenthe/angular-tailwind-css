import { Routes } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';

export const reactiveStateRoutes: Routes = [
  {
    path: 'candidates',
    title: 'Candidates Page',
    component: CandidatesComponent,
  },
  {
    path: 'candidates/:id',
    title: 'Single Candidates Page',
    component: SingleCandidateComponent,
  },
  { path: '', redirectTo: 'candidates', pathMatch: 'full' },
];
