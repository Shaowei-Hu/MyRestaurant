import { BaseEntity } from './../../shared';

export class Desk implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public clientNumber?: number,
        public amount?: number,
        public restaurant?: BaseEntity,
        public ordres?: BaseEntity[],
        public payments?: BaseEntity[],
    ) {
    }
}
