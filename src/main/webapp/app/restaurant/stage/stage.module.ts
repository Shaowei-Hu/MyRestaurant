import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import { MyRestaurantListMergedModule } from '../summary/list-merged.module';

import {
    StageComponent,
    stageRoute,
} from './';

let ENTITY_STATES = [
    ...stageRoute
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        MyRestaurantListMergedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StageComponent,
    ],
    entryComponents: [
        StageComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantStageModule {}
