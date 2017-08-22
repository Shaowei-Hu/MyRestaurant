import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { CalculatorPopupService } from './calculator-popup.service';

@Component({
    selector: 'res-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: [
        'calculator.component.scss'
    ]
})
export class CalculatorComponent implements OnInit {

    @Input() values: any;
    numResult: string;
    authorities: any[];
    isSaving: boolean;
    lastKey: string;
    resultClass: string;

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
        this.resultClass = 'form-group';
        this.lastKey = '';
        this.numResult = '0';
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            this.press(event.key);
        }
        if (event.keyCode === 42) {
            this.multiple();
        }
        if (event.keyCode === 43) {
            this.plus();
        }
        if (event.keyCode === 45) {
            this.minus();
        }
        if (event.keyCode === 46) {
            this.point();
        }
        if (event.keyCode === 47) {
            this.divide();
        }
        // if (event.keyCode === 13) {
        //     // this.result();
        // }
        if (event.keyCode === 99) {
            this.clean();
        }
    }

    press (num: string) {
        this.lastKey = '';
        if (this.numResult.startsWith('0')) {
            this.numResult = this.numResult.substring(1);
        }
        this.numResult = this.numResult + num;
    }

    point () {
        this.numResult = this.numResult + '.';
    }

    plus () {
        this.numResult = this.numResult + '+';
    }

    minus () {
        this.numResult = this.numResult + '-';
    }

    multiple () {
        this.numResult = this.numResult + '*';
    }

    divide () {
        this.numResult = this.numResult + '/';
    }

    result () {
        let temp: any = 0;
        try {
            temp = eval(this.numResult);
        } catch (err) {
            console.log(err);
            this.resultClass = 'form-group has-danger';
            setTimeout(() => { this.resultClass = 'form-group'; }, 3000);
            return;
        }
        temp = temp.toFixed(3);
        this.numResult = temp.toString();
    }

    roundingUp() {
        let coe = 100;
        this.lastKey === 'roundingUp' ? coe = 10 : coe = 100;
        this.lastKey = 'roundingUp';
        this.numResult = (Math.ceil(Number(this.numResult) * coe) / coe).toString();
    }

    roundingDown() {
        let coe = 100;
        this.lastKey === 'roundingDown' ? coe = 10 : coe = 100;
        this.lastKey = 'roundingDown';
        this.numResult = (Math.floor(Number(this.numResult) * coe) / coe).toString();
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

    getAll() {
        this.numResult = this.values.all.toString();
    }

    getRest() {
        this.numResult = this.values.rest;
    }

    getCurrentValue() {
        this.numResult = this.values.current.toString();
    }

    done() {
        this.result();
        this.activeModal.close(this.numResult);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
