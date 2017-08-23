import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrdreComponent } from './ordre.component';
import { OrdreDetailComponent } from './ordre-detail.component';
import { OrdrePopupComponent } from './ordre-dialog.component';
import { OrdreDeletePopupComponent } from './ordre-delete-dialog.component';

export const ordreRoute: Routes = [
    {
        path: 'ordre',
        component: OrdreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.ordre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ordre/:id',
        component: OrdreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.ordre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordrePopupRoute: Routes = [
    {
        path: 'ordre-new',
        component: OrdrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.ordre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ordre/:id/edit',
        component: OrdrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.ordre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ordre/:id/delete',
        component: OrdreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.ordre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
