/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MyRestaurantTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OrdreDetailComponent } from '../../../../../../main/webapp/app/entities/ordre/ordre-detail.component';
import { OrdreService } from '../../../../../../main/webapp/app/entities/ordre/ordre.service';
import { Ordre } from '../../../../../../main/webapp/app/entities/ordre/ordre.model';

describe('Component Tests', () => {

    describe('Ordre Management Detail Component', () => {
        let comp: OrdreDetailComponent;
        let fixture: ComponentFixture<OrdreDetailComponent>;
        let service: OrdreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyRestaurantTestModule],
                declarations: [OrdreDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OrdreService,
                    JhiEventManager
                ]
            }).overrideTemplate(OrdreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Ordre(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ordre).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
