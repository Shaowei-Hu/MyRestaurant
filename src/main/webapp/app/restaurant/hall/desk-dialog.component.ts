import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Room } from './room.model';
import { Desk, DeskService } from '../../entities/desk';
import { DeskPopupService } from './desk-popup.service';
import { Restaurant, RestaurantService } from '../../entities/restaurant';
import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';
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
        private alertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private deskService: DeskService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: JhiEventManager
    ) {
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
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.deskService.update(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result: Desk) {
        this.eventManager.broadcast({ name: 'deskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
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

    constructor(
        private route: ActivatedRoute,
        private deskPopupService: DeskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.deskPopupService
                    .open(DeskDialogComponent as Component, params['id']);
            } else {
                this.modalRef = this.deskPopupService
                    .open(DeskDialogComponent as Component);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
