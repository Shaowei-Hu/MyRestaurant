import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantPopupService } from './restaurant-popup.service';
import { RestaurantService } from './restaurant.service';

@Component({
    selector: 'jhi-restaurant-delete-dialog',
    templateUrl: './restaurant-delete-dialog.component.html'
})
export class RestaurantDeleteDialogComponent {

    restaurant: Restaurant;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private restaurantService: RestaurantService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['restaurant']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.restaurantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'restaurantListModification',
                content: 'Deleted an restaurant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-restaurant-delete-popup',
    template: ''
})
export class RestaurantDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private restaurantPopupService: RestaurantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.restaurantPopupService
                .open(RestaurantDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
