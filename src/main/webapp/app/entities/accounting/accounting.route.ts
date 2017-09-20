import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccountingComponent } from './accounting.component';
import { AccountingDetailComponent } from './accounting-detail.component';
import { AccountingPopupComponent } from './accounting-dialog.component';
import { AccountingDeletePopupComponent } from './accounting-delete-dialog.component';

export const accountingRoute: Routes = [
    {
        path: 'accounting',
        component: AccountingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.accounting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'accounting/:id',
        component: AccountingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.accounting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountingPopupRoute: Routes = [
    {
        path: 'accounting-new',
        component: AccountingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.accounting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accounting/:id/edit',
        component: AccountingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.accounting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accounting/:id/delete',
        component: AccountingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.accounting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
