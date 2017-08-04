import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Product } from '../entities/product';
import { Ordre } from '../entities/ordre';

import { ItemWithQuantity } from '../dto';


@Component({
    selector: 'list-merged',
    templateUrl: './list-merged.component.html'
})
export class ListMergedComponent implements OnInit, OnDestroy, OnChanges, DoCheck {

    @Input() list: Ordre[];
    @Input() products: Product[];
    authorities: any[];
    ordersWithQuantities: ItemWithQuantity[];
    quantity: number;
    olderList: Ordre[];

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['desk']);
    }

    ngOnInit() {
        this.olderList = [];
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.products = JSON.parse(localStorage.getItem('products'));
        this.ordersWithQuantities = [];
        this.orderList2productWithQuanlity(this.list);
    }
    ngOnDestroy() {

    }

    previousState() {
      window.history.back();
    }


    private orderList2productWithQuanlity(ordres: Ordre[]) {
        if (ordres != null && this.products != null) {
            this.ordersWithQuantities = [];
            for (let product of this.products) {
                let productSelected: Ordre[] = this.list.filter((element) => {
                    return element.name === product.name;
                });
                let productWithQuanlity: ItemWithQuantity = new ItemWithQuantity(product, productSelected.length);
                this.ordersWithQuantities.push(productWithQuanlity);
            }
        }

    }

    ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
        if (changes['list']) {
            this.orderList2productWithQuanlity(this.list);
        }
    }

    ngDoCheck() {
        if ( typeof this.list !== 'undefined') {
            let isSame = (this.list.length === this.olderList.length) && this.list.every((element, index) => {
                return element.name === this.olderList[index].name;
            });
            if (!isSame) {
                this.olderList = this.list.slice();
                this.orderList2productWithQuanlity(this.list);
            }
        }

    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }


}
