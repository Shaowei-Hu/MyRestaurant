import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Accounting } from './accounting.model';
import { AccountingService } from './accounting.service';

@Component({
    selector: 'jhi-accounting-detail',
    templateUrl: './accounting-detail.component.html'
})
export class AccountingDetailComponent implements OnInit, OnDestroy {

    accounting: Accounting;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accountingService: AccountingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccountings();
    }

    load(id) {
        this.accountingService.find(id).subscribe((accounting) => {
            this.accounting = accounting;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccountings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accountingListModification',
            (response) => this.load(this.accounting.id)
        );
    }
}
