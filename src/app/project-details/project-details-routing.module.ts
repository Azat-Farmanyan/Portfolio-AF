import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: ':id', component: ProjectDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDetailsRoutingModule {}