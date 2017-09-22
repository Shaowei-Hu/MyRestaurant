import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiParseLinks } from 'ng-jhipster';

import { Ordre } from '../../entities/ordre/ordre.model';
import { OrdreStatisticsService } from './ordre-statistics.service';
import { ITEMS_PER_PAGE } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

import { ChartComponent} from '../../shared/chart/chart.component';

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

    ordreLabels: string[];
    ordreCountData: number[];
    ordreCumulateData: number[];
    timeLabels: string[];
    timeCountData: number[];

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

    loadPage() {
        this.ordreStatisticsService.query({page: this.page - 1, size: this.itemsPerPage,
            fromDate: this.fromDate, toDate: this.toDate}).subscribe((res) => {
            this.ordres = res.json();
            this.countByTime(this.ordres);
            this.statistic(this.ordres);
        });
    }

    ngOnInit() {
        this.today();
        this.previousMonth();
        this.onChangeDate();
    }

    onChangeDate() {
        this.loadPage();
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

    countByTime(ordres: Ordre[]) {
        let index = 0;
        let count = 0;
        const labels = ['0'];
        const data = [];
        for (const ordre of ordres) {
            // 2017-09-21T14:29:05.073Z
            const time = ordre.creationDate;
            const pos = time.toString().indexOf(':');
            if (index === time.substring(0, pos + 2)) {
                count++;
            } else {
                index = time.substring(0, pos + 2);
                const d = new Date(time);
                let datestring = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
                d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
                datestring = datestring.substring(0, datestring.length - 1) + '0';
                labels.push(datestring);
                data.push(++count);
                count = 0;
            }
        }
        data.push(++count);
        labels.shift();
        data.shift();
        this.timeLabels = labels;
        this.timeCountData = data;
    }

    private statistic(arr: Ordre[]) {
        this.ordreLabels = [];
        this.ordreCountData = [];
        this.ordreCumulateData = [];
        const seen = {};
        arr.forEach((item) => {
            if (seen.hasOwnProperty(item.name)) {
                seen[item.name].len++;
            } else {
                seen[item.name] = {price: item.price, len: 1};
            }
        });

        const uniqueOrderName = Object.keys(seen);
        uniqueOrderName.forEach((item) => {
            this.ordreLabels.push(item);
            this.ordreCountData.push(seen[item].len);
            this.ordreCumulateData.push(seen[item].len * seen[item].price);
        });
    }
}
