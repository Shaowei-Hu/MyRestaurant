import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrdreService {

    private resourceUrl = 'api/ordres';
    private resourceSearchUrl = 'api/_search/ordres';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ordre: Ordre): Observable<Ordre> {
        const copy = this.convert(ordre);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    createMultipe(ordres: Ordre[]): Observable<Ordre[]> {
        const copy: Ordre[] = Object.assign([], ordres);
        return this.http.post(this.resourceUrl + 'es', copy).map((res: Response) => {
             return res.json();
         });
    }

    update(ordre: Ordre): Observable<Ordre> {
        const copy = this.convert(ordre);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Ordre> {
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
        entity.creationDate = this.dateUtils
            .convertDateTimeFromServer(entity.creationDate);
    }

    private convert(ordre: Ordre): Ordre {
        const copy: Ordre = Object.assign({}, ordre);

        copy.creationDate = this.dateUtils.toDate(ordre.creationDate);
        return copy;
    }
}
