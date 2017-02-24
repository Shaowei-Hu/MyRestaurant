import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { OrdreComponent } from './ordre.component';
import { OrdreDetailComponent } from './ordre-detail.component';
import { OrdrePopupComponent } from './ordre-dialog.component';
import { OrdreDeletePopupComponent } from './ordre-delete-dialog.component';

import { Principal } from '../../shared';


export const ordreRoute: Routes = [
  {
    path: 'ordre',
    component: OrdreComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.ordre.home.title'
    }
  }, {
    path: 'ordre/:id',
    component: OrdreDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.ordre.home.title'
    }
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
    outlet: 'popup'
  },
  {
    path: 'ordre/:id/edit',
    component: OrdrePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.ordre.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'ordre/:id/delete',
    component: OrdreDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myRestaurantApp.ordre.home.title'
    },
    outlet: 'popup'
  }
];
