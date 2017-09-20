/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MyRestaurantTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AccountingDetailComponent } from '../../../../../../main/webapp/app/entities/accounting/accounting-detail.component';
import { AccountingService } from '../../../../../../main/webapp/app/entities/accounting/accounting.service';
import { Accounting } from '../../../../../../main/webapp/app/entities/accounting/accounting.model';

describe('Component Tests', () => {

    describe('Accounting Management Detail Component', () => {
        let comp: AccountingDetailComponent;
        let fixture: ComponentFixture<AccountingDetailComponent>;
        let service: AccountingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyRestaurantTestModule],
                declarations: [AccountingDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AccountingService,
                    JhiEventManager
                ]
            }).overrideTemplate(AccountingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Accounting(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.accounting).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
