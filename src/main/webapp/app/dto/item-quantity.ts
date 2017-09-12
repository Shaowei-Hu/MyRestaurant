import { Product } from '../entities/product';
import { BaseEntity } from './../shared';

export class ItemWithQuantity implements BaseEntity {
    constructor(
        public product?: Product,
        public quantity?: number,
        public id?: number,
    ) { }
}
