import { SqlButtonSelect } from './sql.button.select'
import { SqlButtonConnect } from './sql.button.connect'
import { AnimationConnect } from '../animation/animation.connect'

export class SqlButtons {
    private sqlButtonSelect: SqlButtonSelect
    private sqlButtonConnect: SqlButtonConnect 

    constructor() {        
        //criando instancia de button select
        //criando instancia de button connect
        this.sqlButtonSelect = new SqlButtonSelect()
        this.sqlButtonConnect = new SqlButtonConnect()
    }

    getButtonConnect(): SqlButtonConnect{
        return this.sqlButtonConnect
    }

    getButtonSelect(): SqlButtonSelect{
        return this.sqlButtonSelect
    }
}