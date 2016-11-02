import { Animation } from './animation'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { DataFiles } from '../oracle-database/data.files'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlConsole } from '../sql-console/sql.console'
import { SqlConsoleMessage } from '../sql-console/sql.console.message'
import { SqlConsoleMsgError } from '../sql-console/sql.console.msg.error'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'

/**
 * AnimationSelect
 * Classe responsavel por implementar animações relacionadas ao select
 * @attribute {isHashFound} Caso o hash seja encontrado na shared-pool este atributo é marcado como true, caso contrário, false
 * @attribute {animHashNotFoundDelay} Delay da animacao do hash nao encontrado na shared-pool
 * @attribute {animHashFoundDelay} Delay da animacao hash encontrado
 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para  
 */
export class AnimationSelect extends Animation{
    private isHashFound: boolean
    private animHashNotFoundDelay: number
    private animHashFoundDelay: number
    private animUserProcessDelay: number

    constructor(isHashFound: boolean){
        super()
        this.buildAnimSelect(isHashFound)       
    }

    /**
     * buildAnimSelect
     * inicializando elementos da classe
     * @param {isHashFound} argumento passado pelo parser sinalizando se o hash foi encontrado na shared pool ou não
     */
    buildAnimSelect(isHashFound: boolean): void{
        this.isHashFound =  isHashFound
        this.animUserProcessDelay = super.getDelay() * 10
        this.animHashNotFoundDelay = super.getDelay() * 12
        this.animHashFoundDelay = super.getDelay() * 8
    }

    /**
     * start
     * Inicio da animacao do select
     */
    start(): void{
        // setando estado de inicio da animacao
        let userProcess: UserProcess = Orasim.getUserProcess()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        Orasim.getAnimation().setAnimating(true)
        
        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
        // setando estado de termino da animacao        
        userProcess.animateSendDataToServerProcess(this.animUserProcessDelay, "<span style='font-weight: bold'>SELECT</span>")
        .then((result: number) => {
            return serverProcess.doParse()
        })
        .then((result: number) => {
            return this.animateSelect()
        })
        .then((result: number) => {            
            return Orasim.getAnimation().setAnimating(false)            
        })
    }

    /**
     * animateSelect
     * Verificando se o hash na shared pool existe, selecionando animacao especifica
     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
     */
    private animateSelect(): Promise < number > {
        return new Promise < number > ((resolve: Function, reject: Function) => {
            let animationTime = 0

            // rodar animacao especifica se o hash foi encontrado na shared-pool ou não
            if (this.isHashFound) {
                this.animateHashFound()
                animationTime = this.animHashFoundDelay
            } else {
                this.animateHashNotFound()
                animationTime = this.animHashNotFoundDelay
            }

            setTimeout(() => {
                resolve(0)
            }, animationTime);
        })
    }

    /**
     * animateHashNotFound
     * Animacao de hash not found
     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
     */
    animateHashNotFound(): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
            let dataFiles: DataFiles = Orasim.getOracleDatabase().getDataFiles()            
            let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
            let sqlConsole: SqlConsole = Orasim.getSqlConsole()
            let serverProcess: ServerProcess = Orasim.getServerProcess()
            let userProcess: UserProcess = Orasim.getUserProcess()

            // hash nao encontrado
            //sqlConsole.addMsg(new SqlConsoleMsgInfo("ServerProcess nao encontrou o hash na SharedPool"))
            //sqlConsole.addMsg(new SqlConsoleMsgInfo("ServerProcess criando hash da user query"))
            sqlConsole.addMsg(new SqlConsoleMsgInfo("< SP > <span style='font-weight: bold'>HARD</span> parse concluído, gerado <span style='font-weight: bold'>SQL_ID</span>: "+sharedPool.getLastHash().getHashStr()))
            
            // animacao adicionando hash na shared pool
            // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache            
            sharedPool.animateAddHash()               
            let memLocation = sharedPool.getLastMemoryLocation()
            
            // animacao requisitando dados do dataFiles
            // animacao gravando dados no dbBufferCache
            // animacao pegando dados do dbBufferCache
            // animacao enviando dados para userProcess
            let blockHtml = serverProcess.animateGetBlockFromDataFiles(dataFiles, this.animHashNotFoundDelay*0.25)
            serverProcess.animateStoreBlockInDbBufferCache(blockHtml, dbBufferCache, memLocation, this.animHashNotFoundDelay*0.25)            
            serverProcess.animateGetBlockFromDbBufferCache(blockHtml, dbBufferCache, this.animHashNotFoundDelay*0.25)
            serverProcess.animateSendBlockToUserProcess(blockHtml, userProcess, this.animHashNotFoundDelay*0.25)

            //termino da animacao        
            setTimeout(() => {
                //removendo block do DOM                     
                $(blockHtml).remove()
                resolve(0) 
            }, this.animHashNotFoundDelay)
        })//end promise
    }    

    /**
     * animateHashFound
     * Animacao de hash found
     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
     */
    animateHashFound(): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
            let dataFiles: DataFiles = Orasim.getOracleDatabase().getDataFiles()            
            let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
            let sqlConsole: SqlConsole = Orasim.getSqlConsole()
            let serverProcess: ServerProcess = Orasim.getServerProcess()
            let userProcess: UserProcess = Orasim.getUserProcess()
           
            // pegando localizacao do bloco 
            let memLocation = sharedPool.getLastMemoryLocation()

            // animacao pegando dados do dbBufferCache
            // animacao enviando dados para userProcess
            let blockHtml = serverProcess.animateGetNewBlockFromDbBufferCache( dbBufferCache, memLocation, this.animHashFoundDelay*0.5)
            serverProcess.animateSendBlockToUserProcess(blockHtml, userProcess, this.animHashFoundDelay*0.5)
            
            //termino da animacao
            setTimeout(() => {
                //removendo block do DOM
                blockHtml.remove()
                resolve(0) 
            }, this.animHashFoundDelay);
        })//end promise
    }
}