import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import { MyRestaurantListMergedModule } from '../summary/list-merged.module';

import {
    OrderDishesComponent,
    orderDishesRoute
} from './';

const ENTITY_STATES = [
    ...orderDishesRoute
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        MyRestaurantListMergedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderDishesComponent
    ],
    entryComponents: [
        OrderDishesComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantMenuModule {}
