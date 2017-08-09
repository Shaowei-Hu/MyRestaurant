import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { DeskService } from '../../entities/desk';
import { Observable } from 'rxjs/Rx';

import { Room } from './room.model';
import { Desk } from '../../entities/desk';
@Injectable()
export class RoomService {

    private resourceUrl = 'api/desks';
    private resourceSearchUrl = 'api/_search/desks';

    constructor(private http: Http, private deskService: DeskService) { }


    update(desk: Desk): Observable<Desk> {
//        let copy: Desk = Object.assign({}, desk);
//        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
//            return res.json();
//        });
          return this.deskService.update(desk);
    }

    find(id: number): Observable<Desk> {
//        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
//            return res.json();
//        });
          return this.deskService.find(id);
    }

    query(req?: any): Observable<Response> {
//        let options = this.createRequestOption(req);
//        return this.http.get(this.resourceUrl, options)
//        ;
          return this.deskService.query(req);
    }


    search(req?: any): Observable<Response> {
//        let options = this.createRequestOption(req);
//        return this.http.get(this.resourceSearchUrl, options)
//        ;
          return this.deskService.search(req);
    }


    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
