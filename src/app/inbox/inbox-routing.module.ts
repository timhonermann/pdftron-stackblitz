import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InboxComponent } from 'src/app/inbox/containers/inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
