import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./project-details/project-details.module').then(
        (m) => m.ProjectDetailsModule
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 0],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
