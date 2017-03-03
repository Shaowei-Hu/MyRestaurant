import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Room } from './room.model';
import { Desk } from '../entities/desk';
import { RoomService } from './room.service';

import { Response } from '@angular/http';

import { Ordre, OrdreService } from '../entities/ordre';
import { Payment, PaymentService } from '../entities/payment';


@Component({
    selector: 'jhi-desk-operation',
    templateUrl: './desk-operation.component.html'
})
export class DeskOperationComponent implements OnInit, OnDestroy {

    desk: Desk;
    authorities: any[];
    isSaving: boolean;
    ordres: Ordre[];
    payments: Payment[];

    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private roomService: RoomService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: EventManager,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['desk']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe(params => {
          this.load(params['id']);
        });
//        this.ordreService.query().subscribe(
//            (res: Response) => { this.ordres = res.json(); }, (res: Response) => this.onError(res.json()));
//        this.paymentService.query().subscribe(
//            (res: Response) => { this.payments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    previousState() {
      window.history.back();
    }

    save () {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.roomService.update(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {

        }
    }
    load (id) {
        this.roomService.find(id).subscribe(desk => {
            this.desk = desk;
        });
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
}
