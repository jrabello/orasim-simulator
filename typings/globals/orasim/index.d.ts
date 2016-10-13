interface OrasimStatic {

    getUserProcess(): any 

    getServerProcess(): any 

    getSqlConsole(): any 

    getAnimation(): any 

    getOracleInstance(): any 

    getOracleDatabase(): any

}

interface SQLParserStatic{
    parse(str: string)
    lexer: any
}

declare var Orasim: OrasimStatic
declare var SQLParser: SQLParserStatic
