import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Room } from './room.model';
import { Desk, DeskService } from '../../entities/desk';
@Injectable()
export class DeskPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private deskService: DeskService,
        private router: Router

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.deskService.find(id).subscribe(desk => {
                this.deskModalRef(component, desk);
            });
        } else {
            return this.deskModalRef(component, new Desk());
        }
    }

    deskModalRef(component: Component, desk: Desk): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.desk = desk;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
