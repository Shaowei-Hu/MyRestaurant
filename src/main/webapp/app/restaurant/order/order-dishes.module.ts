import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import { MyRestaurantListMergedModule } from '../summary/list-merged.module';

import {
    OrderDishesComponent,
    orderDishesRoute,
    orderPopupRoute,
    OrderPopupService,
    OrderConfirmComponent,
    OrderPopupComponent
} from './';

const ENTITY_STATES = [
    ...orderDishesRoute,
    ...orderPopupRoute
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
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
