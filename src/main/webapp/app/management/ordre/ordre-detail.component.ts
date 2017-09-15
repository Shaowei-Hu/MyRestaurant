import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdreService } from './ordre.service';

@Component({
    selector: 'jhi-ordre-detail',
    templateUrl: './ordre-detail.component.html'
})
export class OrdreDetailComponent implements OnInit, OnDestroy {

    ordre: Ordre;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ordreService: OrdreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrdres();
    }

    load(id) {
        this.ordreService.find(id).subscribe((ordre) => {
            this.ordre = ordre;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrdres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ordreListModification',
            (response) => this.load(this.ordre.id)
        );
    }
}
