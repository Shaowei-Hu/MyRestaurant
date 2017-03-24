import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    quantity: number;

    private subscription: any;

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
        this.jhiLanguageService.setLocations(['desk']);
    }

    ngOnInit() {
        this.quantity = 1;
        this.isSaving = false;
        this.isAddOrder = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe(params => {
          this.load(params['id']);
        });
        this.productService.query().subscribe(
            (res: Response) => { this.products = res.json(); }, (res: Response) => this.onError(res.json()));
//        this.ordreService.query().subscribe(
//            (res: Response) => { this.ordres = res.json(); }, (res: Response) => this.onError(res.json()));
//        this.paymentService.query().subscribe(
//            (res: Response) => { this.payments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
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
            this.desk = desk;
            this.desk.ordre = [];
        });
    }

    addOrder() {
//      this.desk.ordre = null;
    }

    isAddOrderToggle () {
      this.isAddOrder = !this.isAddOrder;
    }

    addCommand (id) {
      let productSelected = this.products.filter(function(product: Product){
        return product.id === id;
      });
      for (let i = 0; i < this.quantity; i++) {
        this.desk.ordre.push(this.product2order(productSelected[0]));
      }
      this.quantity = 1;
    }

    getTableStatus(): boolean {
      return this.desk.status === 'occupied' ? true : false;
    }

    private product2order (product: Product): Ordre {
      let order: Ordre = new Ordre();
      order.name = product.name;
      order.price = product.price;
      order.desk = this.desk;
      return order;
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
}
