import { BaseEntity } from './../../shared';

import { Stage } from '../stage/';
import { Ordre } from '../ordre/';

export const enum PaymentType {
    'CARD',
    'CASH',
    'CHECK',
    'TICKET',
    'OTHER'
}

export class Payment implements BaseEntity {
    constructor(
        public id?: number,
        public type?: PaymentType,
        public info?: string,
        public amount?: number,
        public creationDate?: any,
        public ordres?: Ordre[],
        public stage?: Stage,
    ) {
    }
}
