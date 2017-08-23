import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyRestaurantRoomModule } from './hall/room.module';
import { MyRestaurantTableModule } from './table/table.module';
import { MyRestaurantOrderDishesModule } from './order/order-dishes.module';
import { MyRestaurantBillModule } from './bill/bill.module';
import { MyRestaurantNumpadModule } from './numpad/numpad.module';
import { MyRestaurantCalculatorModule } from './calculator/calculator.module';
import { MyRestaurantListMergedModule } from './summary/list-merged.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyRestaurantRoomModule,
        MyRestaurantTableModule,
        MyRestaurantOrderDishesModule,
        MyRestaurantListMergedModule,
        MyRestaurantBillModule,
        MyRestaurantNumpadModule,
        MyRestaurantCalculatorModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantRestaurantModule {}
