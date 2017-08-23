import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdrePopupService } from './ordre-popup.service';
import { OrdreService } from './ordre.service';
import { Desk, DeskService } from '../desk';
import { Payment, PaymentService } from '../payment';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ordre-dialog',
    templateUrl: './ordre-dialog.component.html'
})
export class OrdreDialogComponent implements OnInit {

    ordre: Ordre;
    isSaving: boolean;

    desks: Desk[];

    payments: Payment[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private ordreService: OrdreService,
        private deskService: DeskService,
        private paymentService: PaymentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.deskService.query()
            .subscribe((res: ResponseWrapper) => { this.desks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.paymentService.query()
            .subscribe((res: ResponseWrapper) => { this.payments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ordre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordreService.update(this.ordre));
        } else {
            this.subscribeToSaveResponse(
                this.ordreService.create(this.ordre));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ordre>) {
        result.subscribe((res: Ordre) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Ordre) {
        this.eventManager.broadcast({ name: 'ordreListModification', content: 'OK'});
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

    trackDeskById(index: number, item: Desk) {
        return item.id;
    }

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ordre-popup',
    template: ''
})
export class OrdrePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordrePopupService: OrdrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ordrePopupService
                    .open(OrdreDialogComponent as Component, params['id']);
            } else {
                this.ordrePopupService
                    .open(OrdreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
