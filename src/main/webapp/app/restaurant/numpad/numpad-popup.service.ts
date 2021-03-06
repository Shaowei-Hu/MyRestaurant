import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Desk } from '../../entities/desk';
import { NumpadComponent } from './';

@Injectable()
export class NumpadPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,

    ) {}

    open(num?: number | any): NgbModalRef {
        let modalRef = null;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (num) {
            modalRef = this.numpadModalRef(NumpadComponent as Component, num.toString());
        } else {
            modalRef = this.numpadModalRef(NumpadComponent as Component, '0');
        }
        return modalRef;
    }

    numpadModalRef(component: Component, num: string): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'sm', backdrop: true, keyboard: true });
        modalRef.componentInstance.numResult = num;
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

}
