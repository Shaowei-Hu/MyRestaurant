import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import {
    NumpadPopupService,
    NumpadComponent,
} from './';


@NgModule({
    imports: [
        MyRestaurantSharedModule
    ],
    declarations: [
        NumpadComponent,
    ],
    entryComponents: [
        NumpadComponent,
    ],
    providers: [
        NumpadPopupService,
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantNumpadModule {}
