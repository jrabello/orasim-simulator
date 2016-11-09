import { SqlConsoleMessage } from './sql.console.message'
/**
 * SqlConsoleMsgWarning
 * Classe responsavel por especializar mensagens de aviso do console da aplicacao
 */
export class SqlConsoleMsgWarning extends SqlConsoleMessage{
    constructor(msg: string){
        super('warning', msg)
    }
}