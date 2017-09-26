import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Accounting } from './accounting.model';
import { AccountingPopupService } from './accounting-popup.service';
import { AccountingService } from './accounting.service';
import { Restaurant, RestaurantService } from '../../entities/restaurant';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-accounting-dialog',
    templateUrl: './accounting-dialog.component.html'
})
export class AccountingDialogComponent implements OnInit {

    accounting: Accounting;
    isSaving: boolean;

    restaurants: Restaurant[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private accountingService: AccountingService,
        private restaurantService: RestaurantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.restaurantService.query()
            .subscribe((res: ResponseWrapper) => { this.restaurants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accounting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountingService.update(this.accounting));
        } else {
            this.subscribeToSaveResponse(
                this.accountingService.create(this.accounting));
        }
    }

    private subscribeToSaveResponse(result: Observable<Accounting>) {
        result.subscribe((res: Accounting) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Accounting) {
        this.eventManager.broadcast({ name: 'accountingListModification', content: 'OK'});
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

    trackRestaurantById(index: number, item: Restaurant) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-accounting-popup',
    template: ''
})
export class AccountingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountingPopupService: AccountingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accountingPopupService
                    .open(AccountingDialogComponent as Component, params['id']);
            } else {
                this.accountingPopupService
                    .open(AccountingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
