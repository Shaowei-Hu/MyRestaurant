import { BaseEntity } from './../../shared';

export class Restaurant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public content?: string,
        public creationDate?: any,
        public desks?: BaseEntity[],
        public categories?: BaseEntity[],
        public accountings?: BaseEntity[],
    ) {
    }
}
