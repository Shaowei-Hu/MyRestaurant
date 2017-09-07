import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';

import {
    DeskPopupService,
    RoomComponent,
    DeskDialogComponent,
    DeskPopupComponent,
    roomRoute,
    deskPopupRoute
} from './';

const ENTITY_STATES = [
    ...roomRoute,
    ...deskPopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RoomComponent,
        DeskDialogComponent,
        DeskPopupComponent
    ],
    entryComponents: [
        RoomComponent,
        DeskDialogComponent,
        DeskPopupComponent
    ],
    providers: [
        DeskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantRoomModule {}
