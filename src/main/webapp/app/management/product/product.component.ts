import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { Category } from '../category/category.model';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {
    products: Product[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private productService: ProductService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.productService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.products = this.restoreData(res.json),
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.productService.query().subscribe(
            (res: ResponseWrapper) => {
                this.products = this.restoreData(res.json);
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
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

    restoreData(data) {
        const categories: Category[] = [];
        for (const item of data) {
            if (item.category != null && item.category.id != null) {
                categories.push(item.category);
            }
        }
        for (const item of data) {
            if (item.category != null && item.category.id == null) {
                item.category = categories.filter((it) => {
                    return it.id === item.category;
                 })[0];
            }
        }
        return data;
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Product) {
        return item.id;
    }
    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
