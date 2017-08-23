import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Restaurant } from './restaurant.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RestaurantService {

    private resourceUrl = 'api/restaurants';
    private resourceSearchUrl = 'api/_search/restaurants';

    constructor(private http: Http) { }

    create(restaurant: Restaurant): Observable<Restaurant> {
        const copy = this.convert(restaurant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(restaurant: Restaurant): Observable<Restaurant> {
        const copy = this.convert(restaurant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Restaurant> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(restaurant: Restaurant): Restaurant {
        const copy: Restaurant = Object.assign({}, restaurant);
        return copy;
    }
}
