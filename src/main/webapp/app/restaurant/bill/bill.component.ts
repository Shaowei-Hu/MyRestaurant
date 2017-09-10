import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { Stage, StageService } from '../../entities/stage';

import { Response } from '@angular/http';

import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';
import { Desk, DeskService } from '../../entities/desk';

@Component({
    selector: 'res-table',
    templateUrl: './bill.component.html'
})
export class BillComponent implements OnInit, OnDestroy {

    stage: Stage;
    authorities: any[];
    isSaving: boolean;
    payments: Payment[];
    isDetail: boolean;
    quantity: number;

    ordreInStage: Ordre[];
    paymentTemp: Payment;

    amountRest: number;

    private subscription: any;
    eventSubscriber: Subscription;

    constructor(
        private alertService: JhiAlertService,
        private stageService: StageService,
        private ordreService: OrdreService,
        private deskService: DeskService,
        private paymentService: PaymentService,
        private eventManager: JhiEventManager,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.quantity = 1;
        this.isSaving = false;
        this.isDetail = false;
        this.paymentTemp = new Payment();
        this.paymentTemp.amount = 0;
        this.amountRest = 0;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe((params) => {
          this.load(params['id']);
        });
        this.registerChangeInStages();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    previousState() {
      window.history.back();
    }

    load(id) {
        this.stageService.find(id).subscribe((stage) => {
            if (stage.ordres != null) {
                this.ordreInStage = stage.ordres;
            }
            this.stage = stage;
            this.stage.amount = this.getAmount();
            this.amountRest = this.stage.amount - this.getAmountPaid();
            this.paymentTemp.stage = new Stage();
            this.paymentTemp.stage.id = this.stage.id;
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

    getAmount() {
        if (this.ordreInStage) {
            return this.ordreInStage.reduce((pv, cv) => pv + cv.price, 0);
        }
        return 0;
    }

    getAmountPaid() {
        if (this.stage.payments) {
            return this.stage.payments.reduce((pv, cv) => pv + cv.amount, 0);
        }
        return 0;
    }

    change() {
        this.isSaving = true;
        const desk: Desk = this.stage.desk;
        desk.status = 'unoccupied';
        desk.currentStage = null;
        this.deskService.update(desk).subscribe((desk) => {
            this.router.navigate(['/room']);
        }, (res: Response)=> this.onSaveError(res.json()));
    }

    private onSaveSuccess(result: Stage) {
        this.eventManager.broadcast({ name: 'paymentListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackOrdreById(index: number, item: Ordre) {
        return item.id;
    }

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }

    registerChangeInStages() {
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', (response) => this.load(this.stage.id));
    }
}
