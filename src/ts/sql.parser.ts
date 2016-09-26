export class SqlParser{
    //query identifier token(SELECT, INSERT, CREATE, UPDATE)
    private isParsedSuccess: boolean    
    private queryToken: string

    constructor(){
        this.isParsedSuccess = false         
    }

    parse(query: string): void {
        try{
            SQLParser.parse(query)
            this.queryToken = SQLParser.lexer.tokenize(query)[0][0]                        
            this.isParsedSuccess = true            
        }catch(err){
            console.log("Erro SqlParser.parse:",err)
            this.isParsedSuccess = false
            this.queryToken = ""
        }
    }

    parsedSuccess(): boolean{
        return this.isParsedSuccess
    }

    getQueryToken(): string{
        return this.queryToken
    }
}