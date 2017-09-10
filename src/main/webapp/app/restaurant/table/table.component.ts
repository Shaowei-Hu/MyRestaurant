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
    checkboxValue: boolean;

    eventSubscriber: Subscription;

    constructor(
        private alertService: JhiAlertService,
        private deskService: DeskService,
        private stageService: StageService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.route.params.subscribe((params) => {
          this.load(params['id']);
        });
        this.registerChangeInDesks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
    previousState() {
      window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.desk.id !== undefined && this.desk.status === 'occupied' && this.desk.currentStage == null) {
            const currentStage = new Stage();
            currentStage.desk = new Desk();
            currentStage.desk.id = this.desk.id;
            currentStage.name = this.desk.name;
            currentStage.amount = 0;
            currentStage.amountPaid = 0;
            this.stageService.create(currentStage).subscribe((stage) => {
                this.desk.currentStage = new Stage();
                this.desk.currentStage.id = stage.id;
                this.deskService.update(this.desk)
                .subscribe((res: Desk) => {
                    this.onSaveSuccess(res)
                }, (res: Response) => this.onSaveError(res.json));
            }, (res: Response) => this.onSaveError(res.json));
        } else {
            this.deskService.update(this.desk)
            .subscribe((res: Desk) => {
                this.onSaveSuccess(res)
            }, (res: Response) => this.onSaveError(res.json));
        }
    }

    load(id) {
        this.deskService.find(id).subscribe((desk) => {
            this.desk = desk;
            this.checkboxValue = this.getTableStatus();
        });
    }

    loadUpdate(id) {
        this.deskService.find(id).subscribe((desk) => {
            this.desk = desk;
            this.checkboxValue = this.getTableStatus();
            this.save();
        });
    }

    getTableStatus(): boolean {
        return this.desk.status === 'occupied' ? true : false;
    }

    reservation() {
        if (this.checkboxValue) {
            this.desk.status = 'occupied';
        } else {
            this.desk.status = 'unoccupied';
        }
    }

    private onSaveSuccess(result: Desk) {
        this.eventManager.broadcast({ name: 'deskStatusModification', content: 'OK'});
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
        this.eventSubscriber = this.eventManager.subscribe('ordreListModification', (response) => this.loadUpdate (this.desk.id));
    }
}
