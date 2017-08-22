import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Desk, DeskService } from '../../entities/desk';

import { Response } from '@angular/http';

import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';

import { NumpadPopupService } from '../numpad';
import { CalculatorPopupService } from '../calculator';

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

    eventSubscriber: Subscription;

    orderToPay: Ordre[];
    orderSelected: Ordre[];

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private paymentService: PaymentService,
        private eventManager: EventManager,
        private route: ActivatedRoute,
        private numpadService: NumpadPopupService,
        private calculatorService: CalculatorPopupService
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
        this.eventManager.destroy(this.eventSubscriber);
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

    cleanOrder() {
        this.orderSelected = [];
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

    openCalculator () {
        let values = {all: this.desk.amount.toString(), rest: '0', current: this.payment.amount.toString()};
        this.calculatorService.open(values).result.then((result) => {
            this.payment.amount = Number(result);
        }, (reason) => {});
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
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', (response) => this.cleanOrder());
    }
}
