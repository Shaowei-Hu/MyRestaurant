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
                declarations: [DeskDetailComponent],
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
                    DeskService
                ]
            }).overrideComponent(DeskDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
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
            expect(comp.desk).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
