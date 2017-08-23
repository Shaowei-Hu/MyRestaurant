import { BaseEntity } from './../../shared';
import { Desk } from './../Desk';

export class Payment implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public amount?: number,
        public ordres?: BaseEntity[],
        public desk?: Desk,
    ) {
    }
}
