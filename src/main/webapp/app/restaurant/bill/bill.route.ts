import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { BillComponent } from './bill.component';

import { Principal } from '../../shared';


export const billRoute: Routes = [
{
    path: 'bill/:id',
    component: BillComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.room.home.title'
    }
  }
];

