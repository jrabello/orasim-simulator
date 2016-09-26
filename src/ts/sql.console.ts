import { Animation } from './animation'
import { SqlParser } from './sql.parser'
import { SqlConsoleMessage } from './sql.console.message'

export class SqlConsole{
    private sqlParser: SqlParser    

    constructor() {
        this.sqlParser = new SqlParser()        
    }

    private handleKeyPress(e): void {
        //enter key pressed
        if(e.keyCode === 13){
            //getting value from <input type=text> and parsing
            let userSqlCmd = $("#console-input").val()
            this.sqlParser.parse(userSqlCmd)
            
            //if query parsed successfully, run animation otherwise print error
            if (this.sqlParser.parsedSuccess())                
                Orasim.getAnimation().start(this.sqlParser)
            else
                this.addMsg(new SqlConsoleMessage('error', 'Query Inválida!'))
            
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
