export class SqlParser{
    //query identifier token(SELECT, INSERT, CREATE, UPDATE)[always uppercase]
    private queryTokenId: string
    private query: string
    private isParsedSuccess: boolean    
    

    constructor(){
        this.isParsedSuccess = false  
        this.query = ""
        this.isParsedSuccess = false       
    }

    parse(query: string): void {
        try{
            SQLParser.parse(query)
            this.query = query
            this.queryTokenId = SQLParser.lexer.tokenize(query)[0][0]                        
            this.isParsedSuccess = true            
        }catch(err){
            console.log("Erro SqlParser.parse:",err)
            this.isParsedSuccess = false
            this.queryTokenId = ""
            this.query = ""
        }
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