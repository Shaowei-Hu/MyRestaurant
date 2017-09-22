import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    MyRestaurantSharedLibsModule,
    MyRestaurantSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent
} from './';

import { MyRestaurantChartModule } from './chart/chart.module';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    imports: [
        MyRestaurantSharedLibsModule,
        MyRestaurantSharedCommonModule,
        MyRestaurantChartModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        MyRestaurantSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        ChartComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MyRestaurantSharedModule {}
