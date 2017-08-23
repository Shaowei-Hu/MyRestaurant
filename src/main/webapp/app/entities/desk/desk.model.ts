import { BaseEntity } from './../../shared';
import { Ordre } from './../ordre';
import { Payment } from './../payment';

export class Desk implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public clientNumber?: number,
        public amount?: number,
        public restaurant?: BaseEntity,
        public ordres?: Ordre[],
        public payments?: Payment[],
    ) {
    }
}
