import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantPopupService } from './restaurant-popup.service';
import { RestaurantService } from './restaurant.service';
import { Desk, DeskService } from '../desk';
@Component({
    selector: 'jhi-restaurant-dialog',
    templateUrl: './restaurant-dialog.component.html'
})
export class RestaurantDialogComponent implements OnInit {

    restaurant: Restaurant;
    authorities: any[];
    isSaving: boolean;

    desks: Desk[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private restaurantService: RestaurantService,
        private deskService: DeskService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['restaurant']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.deskService.query().subscribe(
            (res: Response) => { this.desks = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.restaurant.id !== undefined) {
            this.restaurantService.update(this.restaurant)
                .subscribe((res: Restaurant) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.restaurantService.create(this.restaurant)
                .subscribe((res: Restaurant) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Restaurant) {
        this.eventManager.broadcast({ name: 'restaurantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackDeskById(index: number, item: Desk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-restaurant-popup',
    template: ''
})
export class RestaurantPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private restaurantPopupService: RestaurantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.restaurantPopupService
                    .open(RestaurantDialogComponent, params['id']);
            } else {
                this.modalRef = this.restaurantPopupService
                    .open(RestaurantDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
