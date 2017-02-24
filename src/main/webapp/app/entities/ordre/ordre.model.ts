import { Desk } from '../desk';
import { Payment } from '../payment';
export class Ordre {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public price?: number,
        public desk?: Desk,
        public payment?: Payment,
    ) { }
}
