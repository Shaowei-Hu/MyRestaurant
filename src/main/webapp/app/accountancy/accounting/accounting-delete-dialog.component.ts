import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Accounting } from './accounting.model';
import { AccountingPopupService } from './accounting-popup.service';
import { AccountingService } from './accounting.service';

@Component({
    selector: 'jhi-accounting-delete-dialog',
    templateUrl: './accounting-delete-dialog.component.html'
})
export class AccountingDeleteDialogComponent {

    accounting: Accounting;

    constructor(
        private accountingService: AccountingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accountingListModification',
                content: 'Deleted an accounting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accounting-delete-popup',
    template: ''
})
export class AccountingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountingPopupService: AccountingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accountingPopupService
                .open(AccountingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
