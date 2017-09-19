import { Route } from '@angular/router';

import { OrdreStatisticsComponent } from './ordre-statistics.component';

export const ordreStatisticsRoute: Route = {
    path: 'ordre-statistics',
    component: OrdreStatisticsComponent,
    data: {
        pageTitle: 'audits.title'
    }
};
