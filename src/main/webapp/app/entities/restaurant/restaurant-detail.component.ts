import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Component({
    selector: 'jhi-restaurant-detail',
    templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {

    restaurant: Restaurant;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private restaurantService: RestaurantService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['restaurant']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.restaurantService.find(id).subscribe(restaurant => {
            this.restaurant = restaurant;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
