import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryPopupComponent } from './category-dialog.component';
import { CategoryDeletePopupComponent } from './category-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-management',
        component: CategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-management/:id',
        component: CategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-new-management',
        component: CategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-management/:id/edit',
        component: CategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-management/:id/delete',
        component: CategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myRestaurantApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
