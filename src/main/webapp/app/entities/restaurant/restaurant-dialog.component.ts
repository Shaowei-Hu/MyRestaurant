import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantPopupService } from './restaurant-popup.service';
import { RestaurantService } from './restaurant.service';

@Component({
    selector: 'jhi-restaurant-dialog',
    templateUrl: './restaurant-dialog.component.html'
})
export class RestaurantDialogComponent implements OnInit {

    restaurant: Restaurant;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restaurant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restaurantService.update(this.restaurant));
        } else {
            this.subscribeToSaveResponse(
                this.restaurantService.create(this.restaurant));
        }
    }

    private subscribeToSaveResponse(result: Observable<Restaurant>) {
        result.subscribe((res: Restaurant) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Restaurant) {
        this.eventManager.broadcast({ name: 'restaurantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-restaurant-popup',
    template: ''
})
export class RestaurantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restaurantPopupService: RestaurantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restaurantPopupService
                    .open(RestaurantDialogComponent as Component, params['id']);
            } else {
                this.restaurantPopupService
                    .open(RestaurantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
