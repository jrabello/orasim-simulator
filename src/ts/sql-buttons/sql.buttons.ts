import { SqlButtonSelect } from './sql.button.select'
import { SqlButtonConnect } from './sql.button.connect'
import { SqlButtonInsert } from './sql.button.insert'
import { SqlButtonCommit } from './sql.button.commit'
import { SqlButtonRollback } from './sql.button.rollback'
import { AnimationConnect } from '../animation/animation.connect'

export class SqlButtons {
    private sqlButtonSelect: SqlButtonSelect
    private sqlButtonConnect: SqlButtonConnect
    private sqlButtonInsert: SqlButtonInsert 
    private sqlButtonCommit: SqlButtonCommit
    private sqlButtonRollback: SqlButtonRollback

    constructor() {        
        //criando instancia de button select, insert, connect        
        this.sqlButtonSelect = new SqlButtonSelect()
        this.sqlButtonConnect = new SqlButtonConnect()
        this.sqlButtonInsert = new SqlButtonInsert()
        this.sqlButtonCommit = new SqlButtonCommit()
        this.sqlButtonRollback = new SqlButtonRollback()
    }

    getButtonRollback(): SqlButtonRollback{
        return this.sqlButtonRollback
    }

    getButtonCommit(): SqlButtonCommit{
        return this.sqlButtonCommit
    }

    getButtonInsert(): SqlButtonInsert{
        return this.sqlButtonInsert
    }

    getButtonConnect(): SqlButtonConnect{
        return this.sqlButtonConnect
    }

    getButtonSelect(): SqlButtonSelect{
        return this.sqlButtonSelect
    }
}
