import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Ordre } from './ordre.model';
import { OrdreService } from './ordre.service';

@Component({
    selector: 'jhi-ordre-detail',
    templateUrl: './ordre-detail.component.html'
})
export class OrdreDetailComponent implements OnInit, OnDestroy {

    ordre: Ordre;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private ordreService: OrdreService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['ordre']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.ordreService.find(id).subscribe(ordre => {
            this.ordre = ordre;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
