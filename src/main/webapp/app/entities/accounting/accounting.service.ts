import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Accounting } from './accounting.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AccountingService {

    private resourceUrl = 'api/accountings';
    private resourceSearchUrl = 'api/_search/accountings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(accounting: Accounting): Observable<Accounting> {
        const copy = this.convert(accounting);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(accounting: Accounting): Observable<Accounting> {
        const copy = this.convert(accounting);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Accounting> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startTime = this.dateUtils
            .convertDateTimeFromServer(entity.startTime);
        entity.endTime = this.dateUtils
            .convertDateTimeFromServer(entity.endTime);
        entity.creationDate = this.dateUtils
            .convertDateTimeFromServer(entity.creationDate);
    }

    private convert(accounting: Accounting): Accounting {
        const copy: Accounting = Object.assign({}, accounting);

        copy.startTime = this.dateUtils.toDate(accounting.startTime);

        copy.endTime = this.dateUtils.toDate(accounting.endTime);

        copy.creationDate = this.dateUtils.toDate(accounting.creationDate);
        return copy;
    }
}
