/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MyRestaurantTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DeskDetailComponent } from '../../../../../../main/webapp/app/entities/desk/desk-detail.component';
import { DeskService } from '../../../../../../main/webapp/app/entities/desk/desk.service';
import { Desk } from '../../../../../../main/webapp/app/entities/desk/desk.model';

describe('Component Tests', () => {

    describe('Desk Management Detail Component', () => {
        let comp: DeskDetailComponent;
        let fixture: ComponentFixture<DeskDetailComponent>;
        let service: DeskService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyRestaurantTestModule],
                declarations: [DeskDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DeskService,
                    JhiEventManager
                ]
            }).overrideTemplate(DeskDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeskDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeskService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Desk(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.desk).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
