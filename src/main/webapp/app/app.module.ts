import './vendor.ts';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { MyRestaurantSharedModule, UserRouteAccessService } from './shared';
import { MyRestaurantHomeModule } from './home/home.module';
import { MyRestaurantRoomModule } from './room/room.module';
import { MyRestaurantAdminModule } from './admin/admin.module';
import { MyRestaurantAccountModule } from './account/account.module';
import { MyRestaurantEntityModule } from './entities/entity.module';

import { LayoutRoutingModule } from './layouts';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
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
        MyRestaurantRoomModule
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
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class MyRestaurantAppModule {}
