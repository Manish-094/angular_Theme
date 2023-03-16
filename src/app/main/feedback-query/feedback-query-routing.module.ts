import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { SelfQueryComponent } from './self-query/self-query.component';

const routes: Routes = [
{path:'list',component:FeedbackComponent},
{path:'selfquery',component:SelfQueryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackQueryRoutingModule { }
