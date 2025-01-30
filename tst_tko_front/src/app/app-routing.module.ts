import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'transferencia' },
  { path: 'transferencia', component: TransferenciaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
