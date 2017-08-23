/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MyRestaurantTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RestaurantDetailComponent } from '../../../../../../main/webapp/app/entities/restaurant/restaurant-detail.component';
import { RestaurantService } from '../../../../../../main/webapp/app/entities/restaurant/restaurant.service';
import { Restaurant } from '../../../../../../main/webapp/app/entities/restaurant/restaurant.model';

describe('Component Tests', () => {

    describe('Restaurant Management Detail Component', () => {
        let comp: RestaurantDetailComponent;
        let fixture: ComponentFixture<RestaurantDetailComponent>;
        let service: RestaurantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyRestaurantTestModule],
                declarations: [RestaurantDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RestaurantService,
                    JhiEventManager
                ]
            }).overrideTemplate(RestaurantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestaurantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Restaurant(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.restaurant).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
