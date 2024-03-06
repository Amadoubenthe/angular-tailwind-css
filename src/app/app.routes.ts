import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/reactive-state', pathMatch: 'full' },
  {
    path: 'reactive-state',
    loadChildren: () =>
      import('./features/reactive-state/reactive-state.routes').then(
        (m) => m.reactiveStateRoutes
      ),
  },
  {
    path: 'tailwind-css',
    loadChildren: () =>
      import('./features/tailwind-css/tailwind-css.routes').then(
        (m) => m.tailwindCssRoutes
      ),
  },
];
