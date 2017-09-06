import { BaseEntity } from './../../shared';

export class Stage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public clientNumber?: number,
        public amount?: number,
        public amountPaid?: number,
        public creationDate?: any,
        public ordres?: BaseEntity[],
        public payments?: BaseEntity[],
        public desk?: BaseEntity,
    ) {
    }
}
