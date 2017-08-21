import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Desk, DeskService } from '../../entities/desk';

import { Response } from '@angular/http';

import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';


@Component({
    selector: 'res-table',
    templateUrl: './bill.component.html'
})
export class BillComponent implements OnInit, OnDestroy {

    desk: Desk;
    authorities: any[];
    isSaving: boolean;
    payments: Payment[];
    isDetail: boolean;
    quantity: number;

    ordreInDesk: Ordre[];
    paymentTemp: Payment;

    amountRest: number;

    private subscription: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private deskService: DeskService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: EventManager,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['room']);
    }

    ngOnInit() {
        this.quantity = 1;
        this.isSaving = false;
        this.isDetail = false;
        this.paymentTemp = new Payment();
        this.paymentTemp.amount = 0;
        this.amountRest = 0;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe(params => {
          this.load(params['id']);
        });
        this.registerChangeInDesks();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    previousState() {
      window.history.back();
    }

    save () {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.deskService.update(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {

        }
    }

    load (id) {
        this.deskService.find(id).subscribe(desk => {
            if (desk.ordres != null) {
                this.ordreInDesk = desk.ordres;
            }
            this.desk = desk;
            this.desk.ordres = [];
            this.desk.amount = this.getAmount();
            this.amountRest = this.desk.amount - this.getAmountPaid();
            this.paymentTemp.desk = this.desk;
        });
    }

    savePayment() {
        console.log(this.paymentTemp);
        this.isSaving = true;
        if (this.paymentTemp.id === undefined) {
            this.paymentService.create(this.paymentTemp)
                .subscribe((res: Payment) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {

        }
    }

    toggleDetail() {
        this.isDetail = !this.isDetail;
    }


    getAmount () {
        if (this.ordreInDesk) {
            return this.ordreInDesk.reduce((pv, cv) => pv + cv.price, 0);
        }
        return 0;
    }

    getAmountPaid () {
        if (this.desk.payments) {
            return this.desk.payments.reduce((pv, cv) => pv + cv.amount, 0);
        }
        return 0;
    }

    private onSaveSuccess (result: Desk) {
        this.eventManager.broadcast({ name: 'paymentListModification', content: 'OK'});
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
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', (response) => this.load(this.desk.id));
    }
}
