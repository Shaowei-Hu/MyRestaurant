import { BaseEntity } from './../../shared';

import { Stage } from '../stage/'

export class Desk implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public clientNumber?: number,
        public ranking?: number,
        public restaurant?: BaseEntity,
        public stages?: Stage[],
    ) {
    }
}
