import { Animation } from '../animation/animation'
import { SqlParser } from '../sql-parser/sql.parser'
import { SqlConsoleMessage } from './sql.console.message'
import { SqlConsoleMsgInfo } from './sql.console.msg.info'
import { SqlConsoleMsgError } from './sql.console.msg.error'

export class SqlConsole{
    private sqlParser: SqlParser    

    constructor() {
        this.sqlParser = new SqlParser()        
    }

    private handleKeyPress(e): void {
        //enter key pressed
        if(e.keyCode === 13){            
            let userSqlCmd = $("#console-input").val()
            this.sqlParser.parse(userSqlCmd)
            this.addMsg(new SqlConsoleMsgInfo('( ' + this.sqlParser.getQuery() +' )'))
            
            if (this.sqlParser.parsedSuccess())                
                Orasim.getAnimation().start(this.sqlParser)
            else
                this.addMsg(new SqlConsoleMsgError( 'Query Inválida!'))
            
            $("#console-input").val('')            
        }
    }

    addMsg(msg: SqlConsoleMessage): void {
        $("#console-msg-list-container").append(msg.getMsg())
    }

    private logPrint(aMsg: string): void{
        console.log(aMsg)
    }
}
