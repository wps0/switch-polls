import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/RouteUtils';
import { PollViewComponent } from '@views/poll-view/poll-view.component';
import { PageNotFoundComponent } from '@views/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { ResultsViewComponent } from '@views/results-view/results-view.component';

const routes: Routes = [
  {
    path: RouteUtils.POLL,
    component: PollViewComponent,
  },
  {
    path: RouteUtils.POLL_RESULTS,
    component: ResultsViewComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
