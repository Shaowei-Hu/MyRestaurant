import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { MyRestaurantSharedModule, UserRouteAccessService } from './shared';
import { MyRestaurantHomeModule } from './home/home.module';
import { MyRestaurantAdminModule } from './admin/admin.module';
import { MyRestaurantAccountModule } from './account/account.module';
import { MyRestaurantEntityModule } from './entities/entity.module';
import { MyRestaurantRestaurantModule } from './restaurant/restaurant.module';
import { MyRestaurantManagementModule } from './management/management.module';
import { MyRestaurantStatisticsModule } from './statistics/statistics.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        MyRestaurantSharedModule,
        MyRestaurantHomeModule,
        MyRestaurantAdminModule,
        MyRestaurantAccountModule,
        MyRestaurantEntityModule,
        MyRestaurantRestaurantModule,
        MyRestaurantManagementModule,
        MyRestaurantStatisticsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class MyRestaurantAppModule {}
