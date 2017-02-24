import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Desk } from './desk.model';
import { DeskService } from './desk.service';

@Component({
    selector: 'jhi-desk-detail',
    templateUrl: './desk-detail.component.html'
})
export class DeskDetailComponent implements OnInit, OnDestroy {

    desk: Desk;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deskService: DeskService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['desk']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.deskService.find(id).subscribe(desk => {
            this.desk = desk;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
