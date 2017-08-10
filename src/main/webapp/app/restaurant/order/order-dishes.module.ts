import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import { UiSwitchModule } from 'angular2-ui-switch';

import { MyRestaurantListMergedModule } from '../summary/list-merged.module';

import {
    OrderDishesComponent,
    orderDishesRoute,
    orderPopupRoute,
    OrderPopupService,
    OrderConfirmComponent,
    OrderPopupComponent
} from './';

let ENTITY_STATES = [
    ...orderDishesRoute,
    ...orderPopupRoute
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        UiSwitchModule,
        MyRestaurantListMergedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderDishesComponent,
        OrderConfirmComponent,
        OrderPopupComponent
    ],
    entryComponents: [
        OrderDishesComponent,
        OrderConfirmComponent,
    ],
    providers: [
        OrderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantOrderDishesModule {}
