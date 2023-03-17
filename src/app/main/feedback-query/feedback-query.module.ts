import { NgModule } from '@angular/core';

import { FeedbackQueryRoutingModule } from './feedback-query-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { QueryComponent } from './query/query.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BlockUIModule } from 'ng-block-ui';
import { SelfQueryComponent } from './self-query/self-query.component';
import { AssignesToComponent } from './assignes-to/assignes-to.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    QueryComponent,
    SelfQueryComponent,
    AssignesToComponent
  ],
  imports: [
    FeedbackQueryRoutingModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgSelectModule,
      NgbModule,
      BlockUIModule
  ]
})
export class FeedbackQueryModule { }
