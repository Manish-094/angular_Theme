import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackQueryRoutingModule } from './feedback-query-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { QueryComponent } from './query/query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@fake-db/fake-db.service';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from '@ctrl/ngx-rightclick';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { LayoutModule } from 'app/layout/layout.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [
    FeedbackComponent,
    QueryComponent
  ],
  imports: [
    CommonModule,
    FeedbackQueryRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true,
    }),
    CoreSidebarModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    CoreCommonModule,
   ContentHeaderModule,
   CardSnippetModule,
    LayoutModule,
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
      NgbModule,
      ContextMenuModule,
      FormsModule,
      Ng2FlatpickrModule,
      CorePipesModule,
      CoreDirectivesModule,
      ReactiveFormsModule,
      BlockUIModule
  ]
})
export class FeedbackQueryModule { }
