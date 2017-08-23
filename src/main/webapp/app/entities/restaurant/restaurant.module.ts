import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import {
    RestaurantService,
    RestaurantPopupService,
    RestaurantComponent,
    RestaurantDetailComponent,
    RestaurantDialogComponent,
    RestaurantPopupComponent,
    RestaurantDeletePopupComponent,
    RestaurantDeleteDialogComponent,
    restaurantRoute,
    restaurantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...restaurantRoute,
    ...restaurantPopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RestaurantComponent,
        RestaurantDetailComponent,
        RestaurantDialogComponent,
        RestaurantDeleteDialogComponent,
        RestaurantPopupComponent,
        RestaurantDeletePopupComponent,
    ],
    entryComponents: [
        RestaurantComponent,
        RestaurantDialogComponent,
        RestaurantPopupComponent,
        RestaurantDeleteDialogComponent,
        RestaurantDeletePopupComponent,
    ],
    providers: [
        RestaurantService,
        RestaurantPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantRestaurantModule {}
