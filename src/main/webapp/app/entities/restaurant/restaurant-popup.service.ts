import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
@Injectable()
export class RestaurantPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private restaurantService: RestaurantService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.restaurantService.find(id).subscribe(restaurant => {
                this.restaurantModalRef(component, restaurant);
            });
        } else {
            return this.restaurantModalRef(component, new Restaurant());
        }
    }

    restaurantModalRef(component: Component, restaurant: Restaurant): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.restaurant = restaurant;
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
