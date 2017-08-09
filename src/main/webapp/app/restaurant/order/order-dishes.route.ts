import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { OrderDishesComponent } from './order-dishes.component';

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
