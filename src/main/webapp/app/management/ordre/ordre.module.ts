import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import {
    OrdreService,
    OrdrePopupService,
    OrdreComponent,
    OrdreDetailComponent,
    OrdreDialogComponent,
    OrdrePopupComponent,
    OrdreDeletePopupComponent,
    OrdreDeleteDialogComponent,
    ordreRoute,
    ordrePopupRoute,
    OrdreResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ordreRoute,
    ...ordrePopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrdreComponent,
        OrdreDetailComponent,
        OrdreDialogComponent,
        OrdreDeleteDialogComponent,
        OrdrePopupComponent,
        OrdreDeletePopupComponent,
    ],
    entryComponents: [
        OrdreComponent,
        OrdreDialogComponent,
        OrdrePopupComponent,
        OrdreDeleteDialogComponent,
        OrdreDeletePopupComponent,
    ],
    providers: [
        OrdreService,
        OrdrePopupService,
        OrdreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantOrdreModule {}
