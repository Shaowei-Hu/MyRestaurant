import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DeskComponent } from './desk.component';
import { DeskDetailComponent } from './desk-detail.component';
import { DeskPopupComponent } from './desk-dialog.component';
import { DeskDeletePopupComponent } from './desk-delete-dialog.component';

export const deskRoute: Routes = [
    {
        path: 'desk',
        component: DeskComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.desk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'desk/:id',
        component: DeskDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.desk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deskPopupRoute: Routes = [
    {
        path: 'desk-new',
        component: DeskPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.desk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'desk/:id/edit',
        component: DeskPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.desk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'desk/:id/delete',
        component: DeskDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.desk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
