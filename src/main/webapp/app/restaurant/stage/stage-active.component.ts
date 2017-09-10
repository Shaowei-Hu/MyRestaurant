import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Response } from '@angular/http';

import { Ordre } from '../../entities/ordre';
import { Payment } from '../../entities/payment';
import { Desk } from '../../entities/desk';
import { Stage, StageService } from '../../entities/stage';

@Component({
    selector: 'res-stage-active',
    templateUrl: './stage-active.component.html',
    styleUrls: [
        'stage-active.component.scss'
    ]
})
export class StageActiveComponent implements OnInit, OnDestroy {

    desk: Desk;
    stage: Stage;
    authorities: any[];
    isSaving: boolean;
    payments: Payment[];
    isDetail: boolean;
    quantity: number;

    ordreInStage: Ordre[];
    ordreTemp: Ordre[];

    private subscription: any;
    eventSubscriber: Subscription;

    constructor(
        private alertService: JhiAlertService,
        private stageService: StageService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.quantity = 1;
        this.isSaving = false;
        this.isDetail = false;
        this.ordreTemp = [];
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

    save() {
        this.isSaving = true;
        if (this.stage.id !== undefined) {
            this.stageService.update(this.stage)
                .subscribe((res: Stage) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {

        }
    }

    load(id) {
        this.stageService.find(id).subscribe((stage) => {
            if (stage.ordres != null) {
                this.ordreInStage = stage.ordres;
            }
            this.stage = stage;
            this.stage.ordres = [];
            this.stage.amount = this.getAmount();
        });
    }

    loadUpdate(id) {
        this.stageService.find(id).subscribe((stage) => {
            if (stage.ordres != null) {
                this.ordreInStage = stage.ordres;
            }
            this.stage = stage;
            this.stage.ordres = [];
            this.stage.amount = this.getAmount();
            this.save();
        });
    }

    toggleDetail() {
        this.isDetail = !this.isDetail;
    }

    getTableStatus(): boolean {
      return this.desk.status === 'occupied' ? true : false;
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

    private onSaveSuccess(result: Desk) {
        this.eventManager.broadcast({ name: 'stageModification', content: 'OK'});
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
        this.eventSubscriber = this.eventManager.subscribe('ordreListModification', (response) => this.loadUpdate (this.stage.id));
    }
}
