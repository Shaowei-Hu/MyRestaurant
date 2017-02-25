import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RoomComponent } from './room.component';
import { DeskDetailComponent } from './desk-detail.component';
import { DeskPopupComponent } from './desk-dialog.component';


import { Principal } from '../shared';


export const roomRoute: Routes = [
  {
    path: 'room',
    component: RoomComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.desk.home.title'
    }
  }, {
    path: 'desk/:id',
    component: DeskDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.desk.home.title'
    }
  }
];

export const deskPopupRoute: Routes = [
  {
    path: 'desk/:id/edit',
    component: DeskPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.desk.home.title'
    },
    outlet: 'popup'
  },

];
