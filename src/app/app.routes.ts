import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive-state',
    loadChildren: () =>
      import('./features/reactive-state/reactive-state.routes').then(
        (m) => m.reactiveStateRoutes
      ),
  },
];
