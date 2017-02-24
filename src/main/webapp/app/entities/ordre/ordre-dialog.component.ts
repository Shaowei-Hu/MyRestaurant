import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdrePopupService } from './ordre-popup.service';
import { OrdreService } from './ordre.service';
import { Desk, DeskService } from '../desk';
import { Payment, PaymentService } from '../payment';
@Component({
    selector: 'jhi-ordre-dialog',
    templateUrl: './ordre-dialog.component.html'
})
export class OrdreDialogComponent implements OnInit {

    ordre: Ordre;
    authorities: any[];
    isSaving: boolean;

    desks: Desk[];

    payments: Payment[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private ordreService: OrdreService,
        private deskService: DeskService,
        private paymentService: PaymentService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['ordre']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.deskService.query().subscribe(
            (res: Response) => { this.desks = res.json(); }, (res: Response) => this.onError(res.json()));
        this.paymentService.query().subscribe(
            (res: Response) => { this.payments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.ordre.id !== undefined) {
            this.ordreService.update(this.ordre)
                .subscribe((res: Ordre) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.ordreService.create(this.ordre)
                .subscribe((res: Ordre) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Ordre) {
        this.eventManager.broadcast({ name: 'ordreListModification', content: 'OK'});
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

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private ordrePopupService: OrdrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.ordrePopupService
                    .open(OrdreDialogComponent, params['id']);
            } else {
                this.modalRef = this.ordrePopupService
                    .open(OrdreDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
