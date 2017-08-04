import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Room } from './room.model';
import { Desk } from '../entities/desk';

import { RoomService } from './room.service';

import { Response } from '@angular/http';

import { Product, ProductService } from '../entities/product';
import { Ordre, OrdreService } from '../entities/ordre';
import { Payment, PaymentService } from '../entities/payment';



@Component({
    selector: 'jhi-desk-operation',
    templateUrl: './desk-operation.component.html'
})
export class DeskOperationComponent implements OnInit, OnDestroy {

    desk: Desk;
    authorities: any[];
    isSaving: boolean;
    payments: Payment[];
    products: Product[];
    isAddOrder: boolean;
    isDetail: boolean;
    buttonLib: String;
    buttonIcon: String;
    quantity: number;

    ordreInDesk: Ordre[];
    ordreTemp: Ordre[];

    private subscription: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private roomService: RoomService,
        private productService: ProductService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: EventManager,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['room']);
    }

    ngOnInit() {
        this.quantity = 1;
        this.isSaving = false;
        this.isAddOrder = false;
        this.isDetail = false;
        this.ordreTemp = [];
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe(params => {
          this.load(params['id']);
        });
         this.products = JSON.parse(localStorage.getItem('products'));
        if (typeof this.products !== 'undefined' && this.products != null) {
        } else {
            this.productService.query().subscribe(
            (res: Response) => {
                this.products = res.json();
                localStorage.setItem('products', JSON.stringify(this.products));
            }, (res: Response) => this.onError(res.json()));
        }
        this.buttonLib = 'myRestaurantApp.room.orderDishes';
        this.buttonIcon = 'fa fa-book';
        this.registerChangeInDesks();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    previousState() {
      window.history.back();
    }

    save () {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.roomService.update(this.desk)
                .subscribe((res: Desk) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {

        }
    }

    load (id) {
        this.roomService.find(id).subscribe(desk => {
            if (desk.ordres != null) {
                this.ordreInDesk = desk.ordres;
            }
            this.desk = desk;
            this.desk.ordres = [];
 //           this.eventManager.broadcast({ name: 'tempOrderModification', content: 'OK'});
        });
    }


    isAddOrderToggle () {
      this.isAddOrder = !this.isAddOrder;
      this.buttonLib = this.isAddOrder ? 'myRestaurantApp.room.finish' : 'myRestaurantApp.room.orderDishes';
      this.buttonIcon = this.isAddOrder ? 'fa fa-arrow-left' : 'fa fa-book';
    }

    toggleDetail() {
        this.isDetail = !this.isDetail;
    }

    getTableStatus(): boolean {
      return this.desk.status === 'occupied' ? true : false;
    }


    onChange (value) {
      if (value) {
        this.desk.status = 'occupied';
      } else {
        this.desk.status = 'unoccupied';
      }
    }

    private onSaveSuccess (result: Desk) {
        this.eventManager.broadcast({ name: 'deskListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackOrdreById(index: number, item: Ordre) {
        return item.id;
    }

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    registerChangeInDesks() {
        this.eventSubscriber = this.eventManager.subscribe('ordreListModification', (response) => this.load (this.desk.id));
    }
}
