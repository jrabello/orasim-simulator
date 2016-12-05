export class Random{
    //inclusive random number
    constructor(){     
    }

    /**
     * getIntBetweenRange
     * Inclusive range 
     */
    getIntBetweenRange(min: number, max: number): number{
        return Math.floor(Math.random()*(max-min+1)+min)
    }
}