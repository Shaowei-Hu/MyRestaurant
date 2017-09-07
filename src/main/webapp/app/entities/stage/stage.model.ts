import { BaseEntity } from './../../shared';

import { Payment } from '../payment/';
import { Desk } from '../desk/';
import { Ordre } from '../ordre/';

export class Stage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public clientNumber?: number,
        public amount?: number,
        public amountPaid?: number,
        public creationDate?: any,
        public ordres?: Ordre[],
        public payments?: Payment[],
        public desk?: Desk,
    ) {
    }
}
