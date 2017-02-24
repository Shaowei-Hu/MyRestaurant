import { Ordre } from '../ordre';
import { Desk } from '../desk';
export class Payment {
    constructor(
        public id?: number,
        public type?: string,
        public amount?: number,
        public ordre?: Ordre,
        public desk?: Desk,
    ) { }
}
