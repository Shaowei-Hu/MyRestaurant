import { Desk } from '../desk';
export class Restaurant {
    constructor(
        public id?: number,
        public name?: string,
        public content?: string,
        public desk?: Desk,
    ) { }
}
