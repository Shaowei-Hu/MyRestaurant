import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrderDishesComponent } from './order-dishes.component';
import { OrderPopupComponent } from './order-confirm.component';

import { Principal } from '../../shared';

export const orderDishesRoute: Routes = [
  {
    path: 'dishes/desk/:id/:name',
    component: OrderDishesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.room.home.title'
    }
  }
];

export const orderPopupRoute: Routes = [
  {
    path: 'dishes/confirm',
    component: OrderPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.room.home.title'
    },
    outlet: 'popup'
  },

];
