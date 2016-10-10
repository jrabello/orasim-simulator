import { Sga } from './sga'

export class OracleInstance{
    private sga: Sga
    constructor(){
        this.sga = new Sga()
    }

    getSga(){
        return this.sga
    }
}