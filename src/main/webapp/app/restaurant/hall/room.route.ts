import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RoomComponent } from './room.component';
import { DeskPopupComponent } from './desk-dialog.component';


import { Principal } from '../../shared';


export const roomRoute: Routes = [
  {
    path: 'room',
    component: RoomComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.room.home.title'
    }
  }
];

export const deskPopupRoute: Routes = [
  {
    path: 'desk/:id',
    component: DeskPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.room.home.title'
    },
    outlet: 'popup'
  },

];
