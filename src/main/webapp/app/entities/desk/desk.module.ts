import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import {
    DeskService,
    DeskPopupService,
    DeskComponent,
    DeskDetailComponent,
    DeskDialogComponent,
    DeskPopupComponent,
    DeskDeletePopupComponent,
    DeskDeleteDialogComponent,
    deskRoute,
    deskPopupRoute,
} from './';

let ENTITY_STATES = [
    ...deskRoute,
    ...deskPopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DeskComponent,
        DeskDetailComponent,
        DeskDialogComponent,
        DeskDeleteDialogComponent,
        DeskPopupComponent,
        DeskDeletePopupComponent,
    ],
    entryComponents: [
        DeskComponent,
        DeskDialogComponent,
        DeskPopupComponent,
        DeskDeleteDialogComponent,
        DeskDeletePopupComponent,
    ],
    providers: [
        DeskService,
        DeskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantDeskModule {}
