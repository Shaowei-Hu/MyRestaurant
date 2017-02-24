import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Desk } from './desk.model';
import { DeskPopupService } from './desk-popup.service';
import { DeskService } from './desk.service';

@Component({
    selector: 'jhi-desk-delete-dialog',
    templateUrl: './desk-delete-dialog.component.html'
})
export class DeskDeleteDialogComponent {

    desk: Desk;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deskService: DeskService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['desk']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.deskService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deskListModification',
                content: 'Deleted an desk'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-desk-delete-popup',
    template: ''
})
export class DeskDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private deskPopupService: DeskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.deskPopupService
                .open(DeskDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
