import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Payment } from './payment.model';
import { PaymentPopupService } from './payment-popup.service';
import { PaymentService } from './payment.service';
import { Ordre, OrdreService } from '../ordre';
import { Desk, DeskService } from '../desk';
@Component({
    selector: 'jhi-payment-dialog',
    templateUrl: './payment-dialog.component.html'
})
export class PaymentDialogComponent implements OnInit {

    payment: Payment;
    authorities: any[];
    isSaving: boolean;

    ordres: Ordre[];

    desks: Desk[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private paymentService: PaymentService,
        private ordreService: OrdreService,
        private deskService: DeskService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['payment']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.ordreService.query().subscribe(
            (res: Response) => { this.ordres = res.json(); }, (res: Response) => this.onError(res.json()));
        this.deskService.query().subscribe(
            (res: Response) => { this.desks = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.payment.id !== undefined) {
            this.paymentService.update(this.payment)
                .subscribe((res: Payment) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.paymentService.create(this.payment)
                .subscribe((res: Payment) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Payment) {
        this.eventManager.broadcast({ name: 'paymentListModification', content: 'OK'});
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

    trackOrdreById(index: number, item: Ordre) {
        return item.id;
    }

    trackDeskById(index: number, item: Desk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-payment-popup',
    template: ''
})
export class PaymentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private paymentPopupService: PaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.paymentPopupService
                    .open(PaymentDialogComponent, params['id']);
            } else {
                this.modalRef = this.paymentPopupService
                    .open(PaymentDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
