import { BaseEntity } from './../../shared';

import { Product } from '../product/'

export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public ranking?: number,
        public products?: Product[],
    ) {
    }
}
