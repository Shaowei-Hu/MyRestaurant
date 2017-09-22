import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiParseLinks } from 'ng-jhipster';

import { Ordre } from '../../entities/ordre/ordre.model';
import { OrdreStatisticsService } from './ordre-statistics.service';
import { ITEMS_PER_PAGE } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
  selector: 'ordre-statistics',
  templateUrl: './ordre-statistics.component.html',
  styleUrls: [
        'ordre-statistics.component.scss'
    ]
})
export class OrdreStatisticsComponent implements OnInit {
    ordres: Ordre[];
    fromDate: string;
    itemsPerPage: any;
    page: number;
    orderProp: string;
    reverse: boolean;
    toDate: string;

    constructor(
        private ordreStatisticsService: OrdreStatisticsService,
        private parseLinks: JhiParseLinks,
        private paginationConfig: PaginationConfig,
        private datePipe: DatePipe
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
        this.reverse = false;
        this.orderProp = 'timestamp';
    }

    getOrdres() {
        // return this.sortAudits(this.audits);
        return this.ordres;
    }

    loadPage(page: number) {
        this.page = page;
        this.onChangeDate();
    }

    ngOnInit() {
        this.today();
        this.previousMonth();
        this.onChangeDate();
    }

    onChangeDate() {
        this.ordreStatisticsService.query({page: this.page - 1, size: this.itemsPerPage,
            fromDate: this.fromDate, toDate: this.toDate}).subscribe((res) => {

            this.ordres = res.json();
        });
    }

    previousMonth() {
        const dateFormat = 'yyyy-MM-dd';
        let fromDate: Date = new Date();

        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }

        this.fromDate = this.datePipe.transform(fromDate, dateFormat);
    }

    today() {
        const dateFormat = 'yyyy-MM-dd';
        // Today + 1 day - needed if the current day must be included
        const today: Date = new Date();
        today.setDate(today.getDate() + 1);
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate = this.datePipe.transform(date, dateFormat);
    }

    // private sortAudits(audits: Audit[]) {
    //     audits = audits.slice(0).sort((a, b) => {
    //         if (a[this.orderProp] < b[this.orderProp]) {
    //             return -1;
    //         } else if ([b[this.orderProp] < a[this.orderProp]]) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     });

    //     return this.reverse ? audits.reverse() : audits;
    // }
}
