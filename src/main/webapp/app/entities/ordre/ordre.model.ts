import { BaseEntity } from './../../shared';
import { Desk } from './../desk';

export class Ordre implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public price?: number,
        public desk?: Desk,
        public payment?: BaseEntity,
    ) {
    }
}
