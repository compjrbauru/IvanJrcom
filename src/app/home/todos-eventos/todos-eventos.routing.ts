import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodosEventosComponent } from './todos-eventos.component';
const routes: Routes = [
  {
    path: '',
    component: TodosEventosComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosEventosRoutingModule {}
