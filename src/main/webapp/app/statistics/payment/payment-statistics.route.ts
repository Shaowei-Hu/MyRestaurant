import { Route } from '@angular/router';

import { PaymentStatisticsComponent } from './payment-statistics.component';

export const paymentStatisticsRoute: Route = {
    path: 'payment-statistics',
    component: PaymentStatisticsComponent,
    data: {
        pageTitle: 'audits.title'
    }
};
