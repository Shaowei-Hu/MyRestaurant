import { BaseEntity } from './../../shared';

const enum AccountingType {
    'HALF',
    'DIARY',
    'WEEKLY',
    'MONTHLY',
    'TRIMESTER',
    'SEMESTER',
    'YEARLY'
}

export class Accounting implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: AccountingType,
        public info?: string,
        public startTime?: any,
        public endTime?: any,
        public card?: number,
        public cash?: number,
        public check?: number,
        public ticket?: number,
        public other?: number,
        public total?: number,
        public creationDate?: any,
        public restaurant?: BaseEntity,
    ) {
    }
}
