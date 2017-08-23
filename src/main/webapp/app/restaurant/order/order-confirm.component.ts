import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { OrderPopupService } from './order-popup.service';
import { Restaurant, RestaurantService } from '../../entities/restaurant';
import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';
@Component({
    selector: 'jhi-order-confirm',
    templateUrl: './order-confirm.component.html'
})
export class OrderConfirmComponent implements OnInit {

    authorities: any[];
    isSaving: boolean;

    restaurants: Restaurant[];

    ordres: Ordre[];

    payments: Payment[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];

    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-order-popup',
    template: ''
})
export class OrderPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;

    constructor (
        private route: ActivatedRoute,
        private orderPopupService: OrderPopupService
    ) {}

    ngOnInit() {
        this.modalRef = this.orderPopupService.open(OrderConfirmComponent as Component);
    }

    ngOnDestroy() {
    }
}
