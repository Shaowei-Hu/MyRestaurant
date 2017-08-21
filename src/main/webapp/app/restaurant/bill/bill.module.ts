import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import { MyRestaurantListMergedModule } from '../summary/list-merged.module';

import {
    BillComponent,
    billRoute,
    ByAmountComponent,
    ByOrderComponent
} from './';

let ENTITY_STATES = [
    ...billRoute
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        MyRestaurantListMergedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BillComponent,
        ByAmountComponent,
        ByOrderComponent
    ],
    entryComponents: [
        BillComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantBillModule {}
