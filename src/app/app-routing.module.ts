import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'document',
    loadChildren: () => import('./document/document.module').then((m) => m.DocumentModule)
  },
  {
    path: '',
    loadChildren: () => import('./inbox/inbox.module').then((m) => m.InboxModule)
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
