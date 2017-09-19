import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import {
    OrdreStatisticsService,
    OrdreStatisticsComponent,
    ordreStatisticsRoute,

} from './';

const ENTITY_STATES = [
    ordreStatisticsRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrdreStatisticsComponent,
    ],
    entryComponents: [
        OrdreStatisticsComponent,
    ],
    providers: [
        OrdreStatisticsService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantOrdreStatisticsModule {}
