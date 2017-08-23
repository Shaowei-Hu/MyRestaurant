import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Desk } from './desk.model';
import { DeskService } from './desk.service';

@Component({
    selector: 'jhi-desk-detail',
    templateUrl: './desk-detail.component.html'
})
export class DeskDetailComponent implements OnInit, OnDestroy {

    desk: Desk;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private deskService: DeskService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDesks();
    }

    load(id) {
        this.deskService.find(id).subscribe((desk) => {
            this.desk = desk;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDesks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'deskListModification',
            (response) => this.load(this.desk.id)
        );
    }
}
