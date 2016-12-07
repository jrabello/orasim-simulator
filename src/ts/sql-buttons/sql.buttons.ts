import { SqlButtonSelect } from './sql.button.select'
import { SqlButtonConnect } from './sql.button.connect'
import { SqlButtonInsert } from './sql.button.insert'
import { SqlButtonCommit } from './sql.button.commit'
import { SqlButtonRollback } from './sql.button.rollback'
import { SqlButtonUpdate } from './sql.button.update'
import { SqlButtonDelete } from './sql.button.delete'
import { AnimationConnect } from '../animation/animation.connect'

export class SqlButtons {
    private sqlButtonSelect: SqlButtonSelect
    private sqlButtonConnect: SqlButtonConnect
    private sqlButtonInsert: SqlButtonInsert 
    private sqlButtonCommit: SqlButtonCommit
    private sqlButtonRollback: SqlButtonRollback
    private sqlButtonUpdate: SqlButtonUpdate
    private sqlButtonDelete: SqlButtonDelete

    constructor() {        
        //criando instancia de button select, insert, connect        
        this.sqlButtonConnect = new SqlButtonConnect()

        this.sqlButtonSelect = new SqlButtonSelect()    
        this.sqlButtonInsert = new SqlButtonInsert()
        this.sqlButtonUpdate = new SqlButtonUpdate()
        this.sqlButtonDelete = new SqlButtonDelete()
        
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
