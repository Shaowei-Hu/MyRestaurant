import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import {
    CalculatorPopupService,
    CalculatorComponent,
} from './';

@NgModule({
    imports: [
        MyRestaurantSharedModule
    ],
    declarations: [
        CalculatorComponent,
    ],
    entryComponents: [
        CalculatorComponent,
    ],
    providers: [
        CalculatorPopupService,
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantCalculatorModule {}
