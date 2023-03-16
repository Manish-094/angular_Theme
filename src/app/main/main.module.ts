import { NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { SliderComponent } from './slider/slider.component';
import { BlockUIModule } from 'ng-block-ui';
import { AdminComponent } from './admin/admin.component';





@NgModule({
    declarations: [
      DashboardComponent,
      UserListComponent,
      SliderComponent,
      AdminComponent,
     
      // CoreCardSnippetComponent
    ],
    providers: [
    // ! IMPORTANT: Provider used to create fake backend, comment while using real API
    // fakeBackendProvider
    ],

    imports: [
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
        MainRoutingModule,
        FormsModule,
        Ng2FlatpickrModule,
        CorePipesModule,
        CoreDirectivesModule,
        ReactiveFormsModule,
        BlockUIModule
    ]
})
export class MainModule { }

