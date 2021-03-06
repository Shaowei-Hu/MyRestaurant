import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyRestaurantDeskModule } from './desk/desk.module';
import { MyRestaurantOrdreModule } from './ordre/ordre.module';
import { MyRestaurantPaymentModule } from './payment/payment.module';
import { MyRestaurantProductModule } from './product/product.module';
import { MyRestaurantStageModule } from './stage/stage.module';
import { MyRestaurantCategoryModule } from './category/category.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyRestaurantDeskModule,
        MyRestaurantOrdreModule,
        MyRestaurantPaymentModule,
        MyRestaurantProductModule,
        MyRestaurantStageModule,
        MyRestaurantCategoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantManagementModule {}
