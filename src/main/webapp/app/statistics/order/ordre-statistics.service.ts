import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrdreStatisticsService  {
    constructor(private http: Http) { }

    query(req: any): Observable<Response> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('fromDate', req.fromDate);
        params.set('toDate', req.toDate);
        params.set('sort', req.sort);

        const options = {
            search: params
        };

        return this.http.get('api/_search/filter/ordres', options);
    }
}
