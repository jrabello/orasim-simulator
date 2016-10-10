import { SqlConsoleMessage } from './sql.console.message'

export class SqlConsoleMsgInfo extends SqlConsoleMessage{
    constructor(msg: string){
        super('info', msg)
    }
}