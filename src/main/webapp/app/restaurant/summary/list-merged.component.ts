import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Product } from '../../entities/product';
import { Ordre } from '../../entities/ordre';

import { ItemWithQuantity } from '../../dto';


@Component({
    selector: 'res-list-merged',
    templateUrl: './list-merged.component.html'
})
export class ListMergedComponent implements OnInit, OnDestroy, OnChanges, DoCheck {

    @Input() list: Ordre[];
    authorities: any[];
    ordersWithQuantities: ItemWithQuantity[];
    quantity: number;
    olderList: Ordre[];

    constructor(
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.olderList = [];
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.ordersWithQuantities = [];
        this.orderList2productWithQuanlity(this.list);
    }
    ngOnDestroy() {

    }

    previousState() {
      window.history.back();
    }

    private orderList2productWithQuanlity(ordres: Ordre[]) {
        if (ordres != null) {
            this.ordersWithQuantities = [];
            let stats = this.statistic(ordres);
            let uniqueOrderName = Object.keys(stats);
            uniqueOrderName.forEach( item => {
                let product = new Product();
                product.name = item;
                product.price = stats[item].price;
                if (stats[item].len > 0) {
                    let productWithQuanlity: ItemWithQuantity = new ItemWithQuantity(product, stats[item].len);
                    this.ordersWithQuantities.push(productWithQuanlity);
                }
            });
        }

    }

    private statistic(arr: Ordre[]): any {
        let seen = {};
        arr.forEach((item) => {
            if (seen.hasOwnProperty(item.name)) {
                seen[item.name].len++;
            } else {
                seen[item.name] = {price: item.price, len: 1};
            }
        });
        return seen;
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
