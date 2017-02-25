import { Restaurant } from '../entities/restaurant';
import { Desk } from '../entities/desk';
import { Ordre } from '../entities/ordre';
import { Payment } from '../entities/payment';
export class Room {
    constructor(
        public id?: number,
        public name?: string,
        public desks?: Desk[],
    ) { }
}
