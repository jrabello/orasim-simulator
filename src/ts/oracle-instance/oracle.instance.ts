import { Sga } from './sga'
import { Pmon } from './pmon'

export class OracleInstance{
    private sga: Sga
    private pmon: Pmon

    constructor(){
        this.sga = new Sga()
        this.pmon = new Pmon()
    }

    getSga(){
        return this.sga
    }
}