export interface ITimeOnly {
    hours: number;
    minutes: number;
    seconds: number;
}

export class TimeOnly implements ITimeOnly {
    constructor(
        public hours: number, 
        public minutes: number, 
        public seconds: number){}
}