import { Animation } from '../animation/animation'
import { SqlParser } from '../sql-parser/sql.parser'
import { SqlConsoleMessage } from './sql.console.message'
import { SqlConsoleMsgInfo } from './sql.console.msg.info'
import { SqlConsoleMsgError } from './sql.console.msg.error'

/**
 * SqlConsole
 * Classe responsavel por modelar o console que o usuário usa para interagir com a aplicação
 * @attribute {sqlParser} instancia da classe sql-parser que sera responsavel por fazer parsing da query  
 */
export class SqlConsole {
    private sqlParser: SqlParser

    constructor() {
        this.sqlParser = new SqlParser()
        this.addMsg(new SqlConsoleMsgInfo("<br> <span style='font-weight: bold'>&nbsp&nbsp* * * * * * * * * *&nbsp&nbsp&nbsp[&nbsp  Welcome to the ORASIM  &nbsp]&nbsp&nbsp&nbsp&nbsp* * * * * * * * * * </span><br><br>"))
    }

    /**
     *  handleKeyPress
     *  Metodo responsável por receber qualquer tecla pressionada no input do console 
     *  @param   event   evento passado pelo browser de tecla pressionada 
     */
    

    /*
     * Método não está mais sendo utilizado. Verificar remoção.
     * 
     * 
    handleKeyPress(event: KeyboardEvent): void {

        // verificando se tecla enter foi pressionada
        if (event.keyCode === 13) {

            // verificando se existe alguma animacao em andamento 
            if(Orasim.getAnimation().isAnimating()){
                this.addMsg(new SqlConsoleMsgError('Animação em andamento!'))
                return
            }
            
            // pegando valor digitado no input do console
            // fazendo parsing da query
            let userSqlCmd = $("#console-input").val()
            let animation: Animation = this.sqlParser.parse(userSqlCmd)

            // caso a query seja parseada com sucesso execute a animacao especifica
            // caso contrario imprima uma mensagem de erro no console
            if (this.sqlParser.parsedSuccess())
                animation.start()
            else
                this.addMsg(new SqlConsoleMsgError('Query Inválida!'))

            // limpando input do console
            $("#console-input").val('')
        }
    }*/



    /**
     *  addMsg
     *  Responsável por adicionar mensagens no console
     *  @param   {msg}     Mensagem a ser adicionada no console      
     */
    addMsg(msg: SqlConsoleMessage): void {        
        $("#console-msg-list-container").append(msg.getMsg())
        $("#console").scrollTop(1000);
    }
}
