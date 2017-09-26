import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Accounting } from './accounting.model';
import { AccountingService } from './accounting.service';

@Injectable()
export class AccountingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private accountingService: AccountingService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.accountingService.find(id).subscribe((accounting) => {
                    accounting.startTime = this.datePipe
                        .transform(accounting.startTime, 'yyyy-MM-ddTHH:mm:ss');
                    accounting.endTime = this.datePipe
                        .transform(accounting.endTime, 'yyyy-MM-ddTHH:mm:ss');
                    accounting.creationDate = this.datePipe
                        .transform(accounting.creationDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.accountingModalRef(component, accounting);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountingModalRef(component, new Accounting());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountingModalRef(component: Component, accounting: Accounting): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accounting = accounting;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
