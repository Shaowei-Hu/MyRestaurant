import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyRestaurantOrdreStatisticsModule } from './order/ordre-statistics.module';
import { MyRestaurantPaymentStatisticsModule } from './payment/payment-statistics.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyRestaurantOrdreStatisticsModule,
        MyRestaurantPaymentStatisticsModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantStatisticsModule {}
