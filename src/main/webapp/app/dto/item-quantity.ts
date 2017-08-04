import { Product } from '../entities/product';

export class ItemWithQuantity {
    constructor(
        public product?: Product,
        public quantity?: number,
    ) { }
}
