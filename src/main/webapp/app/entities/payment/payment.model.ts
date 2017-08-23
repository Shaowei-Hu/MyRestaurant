import { BaseEntity } from './../../shared';

export class Payment implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public amount?: number,
        public ordres?: BaseEntity[],
        public desk?: BaseEntity,
    ) {
    }
}
