import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyRestaurantSharedModule } from '../shared';

import {
    ItemWithQuantity,
     } from './';


@NgModule({
    imports: [
        MyRestaurantSharedModule,
    ],
    declarations: [
        ItemWithQuantity
    ],
    entryComponents: [
        ItemWithQuantity
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantDtoModule {}
