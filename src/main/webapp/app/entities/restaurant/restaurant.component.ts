import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-restaurant',
    templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit, OnDestroy {
restaurants: Restaurant[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private restaurantService: RestaurantService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['restaurant']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.restaurantService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.restaurants = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.restaurantService.query().subscribe(
            (res: Response) => {
                this.restaurants = res.json();
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
        this.registerChangeInRestaurants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Restaurant) {
        return item.id;
    }



    registerChangeInRestaurants() {
        this.eventSubscriber = this.eventManager.subscribe('restaurantListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
