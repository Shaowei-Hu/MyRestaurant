import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../shared';
import { UiSwitchModule } from 'angular2-ui-switch';

import {
    RoomService,
    DeskPopupService,
    RoomComponent,
    DeskOperationComponent,
    DeskDialogComponent,
    DeskPopupComponent,
    OrderDishesComponent,
    ListMergedComponent,
    roomRoute,
    deskPopupRoute,
} from './';

let ENTITY_STATES = [
    ...roomRoute,
    ...deskPopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        UiSwitchModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RoomComponent,
        DeskOperationComponent,
        DeskDialogComponent,
        DeskPopupComponent,
        OrderDishesComponent,
        ListMergedComponent
    ],
    entryComponents: [
        RoomComponent,
        DeskOperationComponent,
        DeskDialogComponent,
        DeskPopupComponent,
        OrderDishesComponent,
        ListMergedComponent
    ],
    providers: [
        RoomService,
        DeskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantRoomModule {}
