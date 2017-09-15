import { BaseEntity } from './../../shared';

import { Stage } from '../stage/';

export class Ordre implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public price?: number,
        public creationDate?: any,
        public stage?: number,
        public payment?: BaseEntity,
    ) {
    }
}
