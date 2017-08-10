import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Desk } from '../../entities/desk';

import { Response } from '@angular/http';

import { Product, ProductService } from '../../entities/product';
import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';

import { ItemWithQuantity } from '../../dto';


@Component({
    selector: 'res-order-dishes',
    templateUrl: './order-dishes.component.html'
})
export class OrderDishesComponent implements OnInit, OnDestroy {

    desk: Desk;
    products: Product[];
    authorities: any[];
    isSaving: boolean;
    isDetail: boolean;
    payments: Payment[];

    productsWithQuantities: ItemWithQuantity[];

    ordreTemp: Ordre[];

    // private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private productService: ProductService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: EventManager,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.jhiLanguageService.setLocations(['room']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.isDetail = false;
        this.ordreTemp = [];
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];

        this.route.params.subscribe(params => {
          this.desk = new Desk();
          this.desk.id = params['id'];
          this.desk.name = params['name'];
        });

        this.products = JSON.parse(localStorage.getItem('products'));
        if (typeof this.products !== 'undefined' && this.products != null && this.products.length > 0) {
            this.productsWithQuantities = this.product2productWithQuantity(this.products);
        } else {
            this.productService.query().subscribe(
            (res: Response) => {
                this.products = res.json();
                localStorage.setItem('products', JSON.stringify(this.products));
                this.productsWithQuantities = this.product2productWithQuantity(this.products);
            }, (res: Response) => this.onError(res.json()));
        }
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    previousState() {
      window.history.back();
    }

    toggleDetail() {
        this.isDetail = !this.isDetail;
    }

    addTempItem (index) {
      let productSelected = this.productsWithQuantities[index];
      for (let i = 0; i < productSelected.quantity; i++) {
        this.ordreTemp.push(this.product2order(productSelected.product));
      }
      this.productsWithQuantities[index].quantity = 0;
    }

    deleteTempItem(index: number) {
        this.ordreTemp.splice(index, 1);
    }

    setQuantity(index: number, quantity: number) {
        this.productsWithQuantities[index].quantity = quantity;
    }

    addOrdre() {
        this.isSaving = true;
        if (this.desk.id !== undefined) {
            this.ordreService.createMultipe(this.ordreTemp).subscribe(
                (res: Ordre[]) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json())
                );
        } else {

        }
    }

    private product2order (product: Product): Ordre {
      let order: Ordre = new Ordre();
      order.name = product.name;
      order.price = product.price;
      order.desk = this.desk.id;
      return order;
    }

    private product2productWithQuantity(products: Product[]): ItemWithQuantity[] {
        let productWithQuantity: ItemWithQuantity[] = [];
        for (let product of products) {
            productWithQuantity.push(new ItemWithQuantity(product, 0));
        }
        return productWithQuantity;
    }

    private ordres2ordresWithQuantities(ordres: Ordre[]): ItemWithQuantity[] {
        return null;
    }

    private onSaveSuccess (result: Desk) {
        this.eventManager.broadcast({ name: 'ordreListModification', content: 'OK'});
        this.router.navigate(['/', { outlets: { popup: 'dishes/confirm'} }]);
        this.isSaving = false;
        this.ordreTemp = [];
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

}
