import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
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
                declarations: [RestaurantDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    RestaurantService
                ]
            }).overrideComponent(RestaurantDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
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
            expect(comp.restaurant).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
