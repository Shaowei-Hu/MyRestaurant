import { Restaurant } from '../restaurant';
import { Ordre } from '../ordre';
import { Payment } from '../payment';
export class Desk {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public clientNumber?: number,
        public amount?: number,
        public restaurant?: Restaurant,
        public ordres?: Ordre[],
        public payments?: Payment[],
    ) { }
}
