import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [
{path:'list',component:FeedbackComponent},
{path:'query',component:QueryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackQueryRoutingModule { }
