import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import {
    PaymentStatisticsService,
    PaymentStatisticsComponent,
    paymentStatisticsRoute

} from './';

const ENTITY_STATES = [
    paymentStatisticsRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PaymentStatisticsComponent
    ],
    entryComponents: [
        PaymentStatisticsComponent,
    ],
    providers: [
        PaymentStatisticsService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantPaymentStatisticsModule {}
