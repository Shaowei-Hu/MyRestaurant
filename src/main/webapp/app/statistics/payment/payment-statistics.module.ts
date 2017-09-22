import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import { ChartsModule } from 'ng2-charts';
import {
    PaymentStatisticsService,
    PaymentStatisticsComponent,
    paymentStatisticsRoute,
    ChartComponent

} from './';

const ENTITY_STATES = [
    paymentStatisticsRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        ChartsModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PaymentStatisticsComponent,
        ChartComponent
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
