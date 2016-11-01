import { Sga } from './sga'
import { Pmon } from './pmon'
import { Smon } from './smon'
import { Dbwr } from './dbwr'
import { Ckpt } from './ckpt'
import { Lgwr } from './lgwr'
import { Arcn } from './arcn'


export class OracleInstance{
    private sga: Sga
    private pmon: Pmon
    private smon: Smon
    private dbwr: Dbwr
    private ckpt: Ckpt
    private lgwr: Lgwr
    private arcn: Arcn

    constructor(){
        this.sga = new Sga()
        this.pmon = new Pmon()
        this.smon = new Smon()
        this.dbwr = new Dbwr()
        this.ckpt = new Ckpt()
        this.lgwr = new Lgwr()
        this.arcn = new Arcn()
    }

    getSga(){
        return this.sga
    }
}