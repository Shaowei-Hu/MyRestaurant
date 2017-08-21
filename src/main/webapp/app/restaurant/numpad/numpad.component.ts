import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { NumpadPopupService } from './numpad-popup.service';

@Component({
    selector: 'res-numpad',
    templateUrl: './numpad.component.html',
    styleUrls: [
        'numpad.component.scss'
    ]
})
export class NumpadComponent implements OnInit {

    @Input() numResult: string;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['room']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
 //       this.numResult = '0';
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
    }

    press (num: string) {
        if (this.numResult.startsWith('0')) {
            this.numResult = this.numResult.substring(1);
        }
        this.numResult = this.numResult + num;
    }

    point () {
        this.numResult = this.numResult + '.';
    }

    negative () {
        if (this.numResult.startsWith('-')) {
            this.numResult = this.numResult.substring(1);
        } else {
            this.numResult = '-' + this.numResult;
        }
    }

    clean () {
        this.numResult = '0';
    }

    del () {
        if (this.numResult.length > 1) {
            this.numResult = this.numResult.substring(0, this.numResult.length - 1);
        } else {
            this.numResult = '0';
        }
    }

    done() {
        this.activeModal.close(this.numResult);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
