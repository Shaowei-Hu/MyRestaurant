import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Desk } from '../../entities/desk';
import { CalculatorComponent } from './';

@Injectable()
export class CalculatorPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,

    ) {}

    open(num?: any): NgbModalRef {
        let modalRef = null;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (num) {
            modalRef = this.numpadModalRef(CalculatorComponent as Component, num);
        } else {
            modalRef = this.numpadModalRef(CalculatorComponent as Component, '{all:"0", rest:"0", current:"0"}');
        }
        return modalRef;
    }

    numpadModalRef(component: Component, num: any): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: true, keyboard: true, windowClass: 'calculator-modal' });
        modalRef.componentInstance.values = num;
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

}
