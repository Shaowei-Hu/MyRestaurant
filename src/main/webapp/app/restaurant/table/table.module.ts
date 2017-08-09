import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import { UiSwitchModule } from 'angular2-ui-switch';

import { MyRestaurantListMergedModule } from '../summary/list-merged.module';

import {
    TableComponent,
    tableRoute,
} from './';

let ENTITY_STATES = [
    ...tableRoute
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        UiSwitchModule,
        MyRestaurantListMergedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TableComponent,
    ],
    entryComponents: [
        TableComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantTableModule {}
