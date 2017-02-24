import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Desk } from './desk.model';
import { DeskPopupService } from './desk-popup.service';
import { DeskService } from './desk.service';
import { Restaurant, RestaurantService } from '../restaurant';
import { Ordre, OrdreService } from '../ordre';
import { Payment, PaymentService } from '../payment';
@Component({
    selector: 'jhi-desk-dialog',
    templateUrl: './desk-dialog.component.html'
})
export class DeskDialogComponent implements OnInit {

    desk: Desk;
    authorities: any[];
    isSaving: boolean;

    restaurants: Restaurant[];

    ordres: Ordre[];

    payments: Payment[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private deskService: DeskService,
        private restaurantService: RestaurantService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['desk']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.restaurantService.query().subscribe(
            (res: Response) => { this.restaurants = res.json(); }, (res: Response) => this.onError(res.json()));
        this.ordreService.query().subscribe(
            (res: Response) => { this.ordres = res.json(); }, (res: Response) => this.onError(res.json()));
        this.paymentService.query().subscribe(
            (res: Response) => { this.payments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.deskService.update(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.deskService.create(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Desk) {
        this.eventManager.broadcast({ name: 'deskListModification', content: 'OK'});
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

    trackRestaurantById(index: number, item: Restaurant) {
        return item.id;
    }

    trackOrdreById(index: number, item: Ordre) {
        return item.id;
    }

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-desk-popup',
    template: ''
})
export class DeskPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private deskPopupService: DeskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.deskPopupService
                    .open(DeskDialogComponent, params['id']);
            } else {
                this.modalRef = this.deskPopupService
                    .open(DeskDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
