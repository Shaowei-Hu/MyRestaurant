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
    selector: 'res-by-amount',
    templateUrl: './by-amount.component.html',
    styleUrls: [
        'payment.scss'
    ]
})
export class ByAmountComponent implements OnInit, OnDestroy {

    @Input() desk: Desk;
    @Input() payment: Payment;
    authorities: any[];
    isSaving: boolean;
    payments: Payment[];
    isDetail: boolean;

    ordreInDesk: Ordre[];

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
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.registerChangeInDesks();
    }

    ngOnDestroy() {

    }
    previousState() {
      window.history.back();
    }

    save () {
        this.isSaving = true;
        if (this.desk.id !== undefined) {

        } else {

        }
    }


    openNumpad () {
        this.numpadService.open().result.then((result) => {
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
