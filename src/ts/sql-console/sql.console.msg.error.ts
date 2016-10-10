import { SqlConsoleMessage } from './sql.console.message'

export class SqlConsoleMsgError extends SqlConsoleMessage{
    constructor(msg: string){
        super('error', msg)
    }
}