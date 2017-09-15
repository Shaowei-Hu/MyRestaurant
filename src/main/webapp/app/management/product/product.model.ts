import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public taxType?: string,
        public description?: string,
        public ranking?: number,
        public category?: BaseEntity,
    ) {
    }
}
