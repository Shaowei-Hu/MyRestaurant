import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyRestaurantSharedModule } from '../../shared';
import {
    AccountingService,
    AccountingPopupService,
    AccountingComponent,
    AccountingDetailComponent,
    AccountingDialogComponent,
    AccountingPopupComponent,
    AccountingDeletePopupComponent,
    AccountingDeleteDialogComponent,
    accountingRoute,
    accountingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...accountingRoute,
    ...accountingPopupRoute,
];

@NgModule({
    imports: [
        MyRestaurantSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AccountingComponent,
        AccountingDetailComponent,
        AccountingDialogComponent,
        AccountingDeleteDialogComponent,
        AccountingPopupComponent,
        AccountingDeletePopupComponent,
    ],
    entryComponents: [
        AccountingComponent,
        AccountingDialogComponent,
        AccountingPopupComponent,
        AccountingDeleteDialogComponent,
        AccountingDeletePopupComponent,
    ],
    providers: [
        AccountingService,
        AccountingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantAccountingModule {}
