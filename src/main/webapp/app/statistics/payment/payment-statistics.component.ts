import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiParseLinks } from 'ng-jhipster';

import { Payment, PaymentType } from '../../entities/payment/payment.model';
import { PaymentStatisticsService } from './payment-statistics.service';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

import { ChartComponent} from '../../shared/chart/chart.component'

@Component({
  selector: 'payment-statistics',
  templateUrl: './payment-statistics.component.html',
  styleUrls: [
        'payment-statistics.component.scss'
    ]
})
export class PaymentStatisticsComponent implements OnInit {
    payments: Payment[];
    fromDate: string;
    orderProp: string;
    toDate: string;
    labels: string[];
    data: number[];
    timeLabels: string[];
    timeCountData: number[];

    constructor(
        private paymentStatisticsService: PaymentStatisticsService,
        private parseLinks: JhiParseLinks,
        private paginationConfig: PaginationConfig,
        private datePipe: DatePipe
    ) {
        this.orderProp = 'timestamp';
    }

    getPayments() {
        // return this.sortAudits(this.audits);
        return this.payments;
    }

    loadPage() {
        this.paymentStatisticsService.query({ fromDate: this.fromDate, toDate: this.toDate}).subscribe((res) => {
            this.payments = res.json();
            this.countByType(this.payments);
            this.countByTime(this.payments);
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
        const dateFormat = 'yyyy-MM-ddTHH:mm';
        let fromDate: Date = new Date();

        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }

        this.fromDate = this.datePipe.transform(fromDate, dateFormat);
    }

    today() {
        const dateFormat = 'yyyy-MM-ddTHH:mm';
        // Today + 1 day - needed if the current day must be included
        const today: Date = new Date();
        today.setDate(today.getDate() + 1);
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate = this.datePipe.transform(date, dateFormat);
    }

    countByType(payments: Payment[]) {
        this.labels = ['CARD', 'CASH', 'CHECK', 'TICKET', 'OTHER'];
        this.data = [0, 0, 0, 0, 0];
        for (const payment of payments) {
            if (payment.type.valueOf().toString() === 'CARD') {
                this.data[0] += payment.amount;
            }
            if (payment.type.valueOf().toString() === 'CASH') {
                this.data[1] += payment.amount;
            }
            if (payment.type.valueOf().toString() === 'CHECK') {
                this.data[2] += payment.amount;
            }
            if (payment.type.valueOf().toString() === 'TICKET') {
                this.data[3] += payment.amount;
            }
            if (payment.type.valueOf().toString() === 'OTHER') {
                this.data[4] += payment.amount;
            }
        }
    }

    countByTime(payments: Payment[]) {
        let index = 0;
        let count = 0;
        const labels = ['0'];
        const data = [];
        for (const payment of payments) {
            // 2017-09-21T14:29:05.073Z
            const time = payment.creationDate;
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
}
