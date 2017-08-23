import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Component({
    selector: 'jhi-restaurant-detail',
    templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {

    restaurant: Restaurant;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private restaurantService: RestaurantService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRestaurants();
    }

    load(id) {
        this.restaurantService.find(id).subscribe((restaurant) => {
            this.restaurant = restaurant;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRestaurants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'restaurantListModification',
            (response) => this.load(this.restaurant.id)
        );
    }
}
