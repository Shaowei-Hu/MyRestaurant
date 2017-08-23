import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import { ListMergedComponent } from './';


@NgModule({
    imports: [
        MyRestaurantSharedModule,
    ],
    declarations: [
        ListMergedComponent
    ],
    entryComponents: [
        ListMergedComponent
    ],
    exports: [
        ListMergedComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantListMergedModule {}
