import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Room } from './room.model';
import { Desk, DeskService } from '../../entities/desk';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
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
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private deskService: DeskService,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.deskService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.desks = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.deskService.query().subscribe(
            (res: ResponseWrapper) => {
                this.desks = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
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

    trackId(index: number, item: Desk) {
        return item.id;
    }

    getRoomAmount() {
        if (this.desks) {
//            return this.desks.reduce((pv, cv) => pv + cv.amount , 0);
            return 0;
        }
        return 0;
    }

    goTable(table: Desk) {
        console.log(table.status);
        if (table.status === 'occupied') {
            this.router.navigate(['/stageActive', table.currentStage.id]);
        } else {
            this.router.navigate(['/table', table.id]);
        }
    }

    registerChangeInDesks() {
        this.eventSubscriber = this.eventManager.subscribe('deskListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    getDeskStatus(flag: string) {
      let cssClasses;
      if (flag === 'occupied') {
        cssClasses = 'card border-warning text-warning desk-occupied';
      } else {
        cssClasses = 'card border-primary text-primary desk';
      }
      return cssClasses;
    }
}
