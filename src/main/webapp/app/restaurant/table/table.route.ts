import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TableComponent } from './table.component';

import { Principal } from '../../shared';


export const tableRoute: Routes = [
{
    path: 'table/:id',
    component: TableComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.room.home.title'
    }
  }
];

