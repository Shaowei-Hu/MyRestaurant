import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Desk, DeskService } from '../../entities/desk';

import { Response } from '@angular/http';

import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';

import { NumpadPopupService } from '../numpad';

@Component({
    selector: 'res-by-order',
    templateUrl: './by-order.component.html',
    styleUrls: [
        'payment.scss'
    ]
})
export class ByOrderComponent implements OnInit, OnDestroy {

    @Input() desk: Desk;
    @Input() payment: Payment;
    authorities: any[];
    isSaving: boolean;
    payments: Payment[];
    isDetail: boolean;

    orderToPay: Ordre[];
    orderSelected: Ordre[];

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private paymentService: PaymentService,
        private eventManager: EventManager,
        private route: ActivatedRoute,
        private numpadService: NumpadPopupService
    ) {
    }

    ngOnInit() {

        this.isSaving = false;
        this.isDetail = false;
        this.orderToPay = this.desk.ordres.slice();
        this.orderSelected = [];
        this.payment.amount = 0;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.registerChangeInDesks();
    }

    ngOnDestroy() {

    }
    previousState() {
      window.history.back();
    }

    selectOrder(index: number) {
        this.orderSelected = this.orderSelected.concat(this.orderToPay.splice(index, 1));
        this.getAmountSelected();
    }

    removeOrder(index: number) {
        this.orderToPay = this.orderToPay.concat(this.orderSelected.splice(index, 1));
        this.getAmountSelected();
    }

    getAmountSelected() {
        if (this.orderSelected) {
            this.payment.amount = this.orderSelected.reduce((pv, cv) => pv + cv.price, 0);
        } else {
            this.payment.amount = 0;
        }
    }

    openNumpad () {
        this.numpadService.open(this.payment.amount).result.then((result) => {
            this.payment.amount = Number(result);
        }, (reason) => {});
    }


    private onSaveSuccess (result: Desk) {
        this.eventManager.broadcast({ name: 'deskListModification', content: 'OK'});
        this.isSaving = false;
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

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }

    registerChangeInDesks() {
    }
}
