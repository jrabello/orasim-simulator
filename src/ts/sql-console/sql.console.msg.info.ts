import { SqlConsoleMessage } from './sql.console.message'

/**
 * Classe responsavel por especializar mensagens de informacao
 * da aplicacao
 */
export class SqlConsoleMsgInfo extends SqlConsoleMessage{
    constructor(msg: string){
        super('info', msg)
    }
}