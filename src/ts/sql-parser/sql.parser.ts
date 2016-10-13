import { Animation } from '../animation/animation'
import { AnimationSelect } from '../animation/animation.select'
import { Crc32 } from '../crypt/crc32'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'

/**
 * Classe Responsavel por fazer analise lexica e sintatica 
 * de uma query sql
 */
export class SqlParser{
    //query identifier token(SELECT, INSERT, CREATE, UPDATE)[always uppercase]
    private queryTokenId: string
    private isParsedSuccess: boolean
    private query: string    
    
    constructor(){
        this.isParsedSuccess = false  
        this.isParsedSuccess = false
        this.query = ""               
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

    /**
     * Metodo responsavel por fazer parsing da sql query
     * @param   query   string contendo sql query inserida no console
     */
    parse(query: string): Animation {
        //.addMsg(new SqlConsoleMsgInfo('( ' + this.sqlParser.getQuery() +' )'))
        
        // transformando a query em lower-case 
        let lowerQuery = query.toLowerCase();

        // verificando qual query foi digitada
        switch(lowerQuery){
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
                return new Animation() 
        }

        this.isParsedSuccess = false
        // retorno default(nenhuma animacao sera executada)
        return new Animation()

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

    
}