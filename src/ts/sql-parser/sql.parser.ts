import { SqlConsole } from '../sql-console/sql.console'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { Animation } from '../animation/animation'
import { AnimationNull } from '../animation/animation.null'
import { AnimationSelect } from '../animation/animation.select'
import { Crc32 } from '../crypt/crc32'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'

/**
 * SqlParser
 * Classe Responsavel por fazer analise lexica e sintatica de uma query sql
 * @attribute {queryTokenId} identificador da query(SELECT, INSERT...)
 * @attribute {isParsedSuccess} flag que indica se a query foi parseada com sucesso
 * @attribute {query} string que armazena a query completa(SELECT * FROM...) 
 */
export class SqlParser{    
    private queryTokenId: string
    private isParsedSuccess: boolean
    private query: string    
    
    constructor(){
        this.isParsedSuccess = false  
        this.isParsedSuccess = false
        this.query = ""               
    }

    /**
     * parse
     * Metodo responsavel por fazer parsing da sql query
     * @param   query   string contendo sql query inserida no console
     * @returns uma instancia da classe Animation(ou classes filhas) 
     */
    parse(query: string): Animation {
        
        let sqlConsole: SqlConsole = Orasim.getSqlConsole()
        sqlConsole.addMsg(new SqlConsoleMsgInfo('Userprocess realizando parsing da query: (' + query +')'))
        
        // transformando a query em lower-case 
        let lowerQuery = query.toLowerCase();

        // verificando qual query foi digitada
        switch(lowerQuery){
            case "connect":
                return new AnimationNull()
            case "select":
                let hash: Hash = new Crc32(lowerQuery)
                let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()                
                let isHashFound = sharedPool.findHash(hash)        

                // caso o hash na seja encontrado, adicione na shared-pool 
                if(!isHashFound)
                    sharedPool.addHash(hash)               
                
                this.isParsedSuccess = true
                return new AnimationSelect(isHashFound)
                
            case "insert":
                console.log('insert')
                this.isParsedSuccess = true
                return new AnimationNull()
                 
            case "update":
                return new AnimationNull()
            case "delete":
                return new AnimationNull()            
        }

        // retorno default(nenhuma animacao sera executada)
        this.isParsedSuccess = false        
        return new AnimationNull()

        // codigo abaixo faz referencia a biblioteca utilizada para fazer parsing 
        // da query, no momento nao estamos utilizando a mesma
        // try{
        //     SQLParser.parse(query)
        //     this.query = query
        //     this.queryTokenId = SQLParser.lexer.tokenize(query)[0][0]                        
        //     this.isParsedSuccess = true            
        // }catch(err){
        //     console.log("Erro SqlParser.parse:",err)
        //     this.isParsedSuccess = false
        //     this.queryTokenId = ""
        //     this.query = ""
        // }
    }

    parsedSuccess(): boolean{
        return this.isParsedSuccess
    }

    getQuery(): string{
        return this.query
    }

    getQueryTokenId(): string{
        return this.queryTokenId
    }
}