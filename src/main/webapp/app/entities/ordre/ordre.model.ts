import { BaseEntity } from './../../shared';

export class Ordre implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public price?: number,
        public creationDate?: any,
        public stage?: BaseEntity,
        public payment?: BaseEntity,
    ) {
    }
}
