import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Desk } from './desk.model';
import { DeskPopupService } from './desk-popup.service';
import { DeskService } from './desk.service';
import { Restaurant, RestaurantService } from '../restaurant';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-desk-dialog',
    templateUrl: './desk-dialog.component.html'
})
export class DeskDialogComponent implements OnInit {

    desk: Desk;
    isSaving: boolean;

    restaurants: Restaurant[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private deskService: DeskService,
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
        if (this.desk.id !== undefined) {
            this.subscribeToSaveResponse(
                this.deskService.update(this.desk));
        } else {
            this.subscribeToSaveResponse(
                this.deskService.create(this.desk));
        }
    }

    private subscribeToSaveResponse(result: Observable<Desk>) {
        result.subscribe((res: Desk) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Desk) {
        this.eventManager.broadcast({ name: 'deskListModification', content: 'OK'});
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
    selector: 'jhi-desk-popup',
    template: ''
})
export class DeskPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private deskPopupService: DeskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.deskPopupService
                    .open(DeskDialogComponent as Component, params['id']);
            } else {
                this.deskPopupService
                    .open(DeskDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
