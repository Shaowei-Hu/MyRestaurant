import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Desk, DeskService } from '../../entities/desk';
import { Stage, StageService } from '../../entities/stage';

import { Response } from '@angular/http';

@Component({
    selector: 'res-table',
    templateUrl: './table.component.html',
    styleUrls: [
        'table.component.scss'
    ]
})
export class TableComponent implements OnInit, OnDestroy {

    desk: Desk;
    authorities: any[];
    isSaving: boolean;

    private subscription: any;
    eventSubscriber: Subscription;

    constructor(
        private alertService: JhiAlertService,
        private deskService: DeskService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe((params) => {
          this.load(params['id']);
        });
        this.registerChangeInDesks();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    previousState() {
      window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.deskService.update(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {

        }
    }

    load(id) {
        this.deskService.find(id).subscribe((desk) => {
            this.desk = desk;
        });
    }

    loadUpdate(id) {
        this.deskService.find(id).subscribe((desk) => {
            this.desk = desk;
            this.save();
        });
    }

    getTableStatus(): boolean {
      return this.desk.status === 'occupied' ? true : false;
    }

    onChange(value) {
      if (value) {
        this.desk.status = 'occupied';
      } else {
        this.desk.status = 'unoccupied';
      }
    }

    private onSaveSuccess(result: Desk) {
        this.eventManager.broadcast({ name: 'deskListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    registerChangeInDesks() {
        // this.eventSubscriber = this.eventManager.subscribe('ordreListModification', (response) => this.loadUpdate (this.desk.id));
    }
}
