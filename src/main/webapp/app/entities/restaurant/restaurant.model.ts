import { BaseEntity } from './../../shared';

export class Restaurant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public content?: string,
        public desks?: BaseEntity[],
    ) {
    }
}
