import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { Stage } from '../../entities/stage';

import { Response } from '@angular/http';

import { Product, ProductService } from '../../entities/product';
import { Ordre, OrdreService } from '../../entities/ordre';
import { Payment, PaymentService } from '../../entities/payment';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

import { ItemWithQuantity } from '../../dto';

@Component({
    selector: 'res-order-dishes',
    templateUrl: './order-dishes.component.html'
})
export class OrderDishesComponent implements OnInit, OnDestroy {

    stage: Stage;
    products: Product[];
    authorities: any[];
    isSaving: boolean;
    isDetail: boolean;
    payments: Payment[];

    productsWithQuantities: ItemWithQuantity[];

    ordreTemp: Ordre[];

    // private subscription: any;

    constructor(
        private alertService: JhiAlertService,
        private productService: ProductService,
        private ordreService: OrdreService,
        private paymentService: PaymentService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.isDetail = false;
        this.ordreTemp = [];
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];

        this.route.params.subscribe((params) => {
          this.stage = new Stage();
          this.stage.id = params['id'];
          this.stage.name = params['name'];
        });

        this.products = JSON.parse(localStorage.getItem('products'));
        if (typeof this.products !== 'undefined' && this.products != null && this.products.length > 0) {
            this.productsWithQuantities = this.product2productWithQuantity(this.products);
        } else {
            this.productService.query().subscribe(
            (res: ResponseWrapper) => {
                this.products = res.json;
                localStorage.setItem('products', JSON.stringify(this.products));
                this.productsWithQuantities = this.product2productWithQuantity(this.products);
            }, (res: ResponseWrapper) => this.onError(res.json));
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

    addTempItem(index) {
      const productSelected = this.productsWithQuantities[index];
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
        if (this.stage.id !== undefined) {
            this.ordreService.createMultipe(this.ordreTemp).subscribe(
                (res: Ordre[]) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json())
                );
        } else {

        }
    }

    private product2order(product: Product): Ordre {
      const order: Ordre = new Ordre();
      order.name = product.name;
      order.price = product.price;
      order.stage = this.stage.id;
      return order;
    }

    private product2productWithQuantity(products: Product[]): ItemWithQuantity[] {
        const productWithQuantity: ItemWithQuantity[] = [];
        for (const product of products) {
            productWithQuantity.push(new ItemWithQuantity(product, 0));
        }
        return productWithQuantity;
    }

    private ordres2ordresWithQuantities(ordres: Ordre[]): ItemWithQuantity[] {
        return null;
    }

    private onSaveSuccess(result: any) {
        this.eventManager.broadcast({ name: 'ordreListModification', content: 'OK'});
 //       this.router.navigate(['/', { outlets: { popup: 'dishes/confirm'} }]);
        this.isSaving = false;
        this.ordreTemp = [];
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

}
