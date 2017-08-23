import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Room } from './room.model';
import { Desk } from '../../entities/desk';
import { RoomService } from './room.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'res-room',
    templateUrl: './room.component.html',
    styleUrls: [
        'room.component.scss'
    ]
})
export class RoomComponent implements OnInit, OnDestroy {
    desks: Desk[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private roomService: RoomService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.roomService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.desks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.roomService.query().subscribe(
            (res: Response) => {
                this.desks = res.json();
                this.currentSearch = '';
            },
            (res: Response) => this.onError(res.json())
        );
    }

    search (query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDesks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Desk) {
        return item.id;
    }

    getRoomAmount() {
        if (this.desks) {
            return this.desks.reduce((pv, cv) => pv + cv.amount , 0);
        }
        return 0;
    }

    registerChangeInDesks() {
        this.eventSubscriber = this.eventManager.subscribe('deskListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    getDeskStatus(flag: string) {
      let cssClasses;
      if (flag === 'occupied') {
        cssClasses = 'panel panel-warning desk-occupied';
      } else {
        cssClasses = 'panel panel-primary desk';
      }
      return cssClasses;
    }
}
