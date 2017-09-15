import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import {
    StageService,
    StagePopupService,
    StageComponent,
    StageDetailComponent,
    StageDialogComponent,
    StagePopupComponent,
    StageDeletePopupComponent,
    StageDeleteDialogComponent,
    stageRoute,
    stagePopupRoute,
    StageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stageRoute,
    ...stagePopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StageComponent,
        StageDetailComponent,
        StageDialogComponent,
        StageDeleteDialogComponent,
        StagePopupComponent,
        StageDeletePopupComponent,
    ],
    entryComponents: [
        StageComponent,
        StageDialogComponent,
        StagePopupComponent,
        StageDeleteDialogComponent,
        StageDeletePopupComponent,
    ],
    providers: [
        StageService,
        StagePopupService,
        StageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantStageModule {}
