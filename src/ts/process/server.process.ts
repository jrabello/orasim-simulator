import { Tooltip } from '../utils/tooltip'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { SqlConsoleMsgWarning } from '../sql-console/sql.console.msg.warning'
import { DataFiles } from '../oracle-database/data.files'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { UserProcess } from './user.process'
import { SharedPool } from '../oracle-instance/shared.pool'
import { DataBlock } from '../oracle-database/data.block'
import { SqlConsole } from '../sql-console/sql.console'
import { Hash } from '../crypt/hash'
import { Pga } from './pga'
import { ServerProcessInsert } from './server.process.insert'
import { Block } from '../oracle-database/block'
import { Delay } from '../time/delay'
import { Arrow } from '../animation/arrow'

/**
 * ServerProcess
 * Classe responsavel por modelar o objeto ServerProcess da animacao
 * @attribute {element} objeto html que referencia o elemento server-process  
 */
export class ServerProcess {
    private element: HTMLElement
    private pga: Pga
    //private insertInstance: ServerProcessInsert

    constructor() {
        this.pga = new Pga()
        this.element = $("#server-process")[0]
        //this.insertInstance = new ServerProcessInsert()

        //criando arrow que representa envio de dados de server process para user process
        $("<div id='arrow-2-server-process' class='left-arrow end'>").css({
            "left": "95px",
            "top": "275px",
            "width": "40px",
            "color": "green",
            "border-top": "3px solid lime" 
        }).hide().appendTo("#animation-container")

        // criando tooltip para o ServerProcess
        let tooltip = new Tooltip("#server-process", "Server Process",
            `
        <p align="justify">

        Oracle Database cria o Server Process para lidar com as solicitações dos User Process conectados à instância. 
        O User Process sempre se comunica com um banco de dados através de um Server Process separado.
        <br><br>
        Os Server Process criados pela soliciação de uma aplicação de banco de dados pode executar uma ou mais das seguintes tarefas:
        
        <br><br>
        - Analisar e executar instruções SQL emitidas através da aplicação, incluindo a criação e execução do plano de consulta.
        
        <br><br>
        - Executa código PL/SQL.
        
        <br><br>
        - Realizar a leitura dos blocos de dados que estão armazenados nos datafiles e carregar no Db Buffer Cache 
        (O processo background DBWn é o responsável por gravar os blocos modificados de volta para o disco)
        
        <br><br>
        - Retorna os resultados solicitados de uma forma que a aplicação pode processar as informações.
        
        <span style='font-weight: bold'>
        </span>
         `
        )
    }

    // getInsertInstance(){
    //     return this.insertInstance
    // }

    getElement(): HTMLElement {
        return this.element
    }

    /**
     * getElementOffset
     * Metodo responsavel por retornar posicao relativa do elemento ao documento
     * @returns coordenada jquery do elemento
     */
    getElementOffset(): JQueryCoordinates {
        return $(this.element).offset()
    }

    createNewBlock(): DataBlock {
        let newBlock = new DataBlock()

        //criando block dentro do do elemento atual        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        $(newBlock.getElement()).css("z-index", 100)

        return newBlock
    }

    /**
     * animateSendBlockTo
     * metodo um pouco mais generico que permite o envio dos dados para elementos usando id  
     */
    async animateSendBlockTo(elementId: string, hash: Hash, delay: number) {
        //criando novo block dentro do server process
        let block = this.createNewBlock()
        block.setColor(hash.getColor())

        //movendo block para elemento
        Orasim.getAnimation().moveTo(block.getElement(), $(elementId)[0], delay, 0, () => {

        }, () => {
            //remova no fim da animacao
            $(block.getElement()).remove()
            let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
            let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
            let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()
            let memLocationArr = sharedPool.getMemoryLocation(hash)
            //verificando qual elemento foi passado como argumento
            //setando local de memoria como dirty buffer
            switch (elementId) {
                case '#redo-log-buffer':
                    redoLogBuffer.setMemoryLocationUsed(hash)
                    break;
                case '#db-buffer-cache':
                    dbBufferCache.setMemoryLocationUsedWithHash(memLocationArr, hash)
                    break;
            }
        })

        await new Delay(delay).sleep()        
    }

    /**
     * animateGetBlockFromDataFiles
     * Metodo responsavel por animar os blocks que o server-process pega do data-files
     * @param {dataFiles} objeto html que representa o DataFiles
     * @param {delay} tempo de animacao
     * @returns retorna o novo bloco criado(htmlElement) dentro do datafiles  
     */
    animateGetBlockFromDataFiles(dataFiles: DataFiles, hash: Hash, memLocationArr: number[], delay: number): HTMLElement[] {
        let blockHtmlArr: HTMLElement[] = []
        let animCounter = 0
        let delayIncrementer = 0
        let currentDelay = delay
        for (let memLocation of memLocationArr) {
            let blockHtml = dataFiles.getNewBlockHtmlWithColor(hash.getColor())
            blockHtmlArr.push(blockHtml)            
            Orasim.getAnimation().moveTo(blockHtml, this.getElement(), currentDelay, 0, () => {
                if (animCounter++ == 0) {
                    //$('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                }
            }, () => { })
            currentDelay = currentDelay - (currentDelay*0.1)
        }
        return blockHtmlArr
    }


    /**
     * animateStoreBlockInDbBufferCache
     * Metodo responsavel por animar o bloco sendo salvo no db-buffer-cache
     * @param {blockHtml} objeto html que representa o bloco animado
     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
     * @param {delay} tempo de animacao 
     */
    animateStoreBlockInDbBufferCache(blockHtmlArr: HTMLElement[], dbBufferCache: DbBufferCache, hash: Hash, memLocationArr: number[], delay: number): void {
        let i = 0
        let animCounterAftr = 0
        let animCounterBef = 0
        for (let blockHtml of blockHtmlArr) {
            Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getBlocks()[memLocationArr[i]].getElement(), delay, delay / 6, () => {
                // no inicio da animacao piscar server-process e db-buffer-cache
                if (animCounterBef++ == 0) {
                    $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                }
                //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess gravando dados no DbBufferCache'))            
            }, () => {
                // depois da animacao completa marcando o bloco como utilizado
                if (++animCounterAftr == blockHtmlArr.length)
                    dbBufferCache.setMemoryLocationUsedWithHash(memLocationArr, hash)
            })
            i++
        }
    }

    /**
     * animateGetNewBlockFromDbBufferCache
     * Metodo responsavel por animar o server-process extraindo um NOVO bloco do db-buffer-cache, 
     * este novo bloco se faz necessario quando é preciso animar qualquer bloco que ja está dentro
     * do db-buffer-cache
     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
     * @param {delay} tempo de animacao
     * @returns retorna novo bloco na posicao de memoria passada como argumento
     */
    animateGetNewBlockFromDbBufferCache(dbBufferCache: DbBufferCache, memLocationArr: number[], delay: number): HTMLElement[] {
        let animCounter = 0
        let blockHtmlArr: HTMLElement[] = []
        //iterating memory locations        
        for (let memLocation of memLocationArr) {
            let blockHtml = dbBufferCache.getNewBlockHtmlAt(memLocation)
            blockHtmlArr.push(blockHtml)

            Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () => {
                if (animCounter++ == 0) {
                    $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DbBufferCache'))
                    Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"))
                }
            }, () => {
                blockHtml.remove()
            })
        }
        return blockHtmlArr
    }

    /**
     * animateGetBlockFromDbBufferCache
     * Metodo responsavel por animar o server-process extraindo um bloco JA EXISTENTE(criado em outro lugar) do db-buffer-cache
     * @param {blockHtml} objeto html que representa o bloco animado    
     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
     * @param {delay} duracao de animacao     
     */
    animateGetBlockFromDbBufferCache(blockHtmlArr: HTMLElement[], dbBufferCache: DbBufferCache, delay: number): void {
        let animCounter = 0
        for (let blockHtml of blockHtmlArr) {
            Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () => {
                if (animCounter++ == 0) {
                    $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"))
                }
                //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess ')) 
            }, () => {
                blockHtml.remove()
            })
        }
    }
    /**
     * animateSendBlockToUserProcess
     * Metodo responsavel por enviar bloco ao user-process
     * @param {blockHtml} objeto html que representa o bloco animado
     * @param {userProcess} objeto html que representa o user-process
     * @param {delay} duracao da animacao
     */
    animateSendBlockToUserProcess(blockHtmlArr: HTMLElement[], userProcess: UserProcess, delay: number) {
        let animCounterAftr = 0
        let animCounterBfr = 0
        for (let blockHtml of blockHtmlArr) {
            Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay, 0, () => {
                if (animCounterBfr++ == 0) {
                    //no inicio da animacao, piscar user-process e server-process     
                    $('.arrow.from-serverp-2-userp').show()
                    $('.arrow.from-serverp-2-userp').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1).wait().hide()
                    $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    $('#user-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    $('#user img').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1)
                    Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Retornando resultado para <span style='font-weight: bold'>UserProcess</span>"))
                }
                //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess enviando dados para UserProcess'))
            },
                () => {
                    if (animCounterAftr++ == 0) {
                        //no final da animacao
                        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< UP > Comando executado com sucesso'))
                        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< UP > Aguardando nova solicitação...'))
                    }
                })
        }
    }

    async animSearchSharedPool(delay: number) {
        $('#server-process').repeat().fadeTo(delay * 0.25, 0.1).fadeTo(delay * 0.25, 1).until(1)
        await new Delay(delay * 0.50).sleep()
        $('#shared-pool').repeat().fadeTo(delay * 0.25, 0.1).fadeTo(delay * 0.25, 1).until(1)
        await new Delay(delay * 0.50).sleep()
    }

    async animGetDataFromDbBufferCache(delay: number) {
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"))
        $('#server-process').repeat().fadeTo(delay * 0.25, 0.1).fadeTo(delay * 0.25, 1).until(1)
        await new Delay(delay * 0.50).sleep()
        $('#db-buffer-cache').repeat().fadeTo(delay * 0.25, 0.1).fadeTo(delay * 0.25, 1).until(1)
        await new Delay(delay * 0.50).sleep()
    }

    async animSendDataToUserProcess(delay: number) {
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Retornando o resultado para <span style='font-weight: bold'>UserProcess</span>"))
        $('#server-process').repeat().fadeTo(delay * 0.165, 0.1).fadeTo(delay * 0.165, 1).until(1)
        await new Delay(delay * 0.33).sleep()

        //new Arrow(20, 190, 25, 210, delay * 0.50).moveToLeft()
        //new Arrow(95, 265, 40, 40, delay*0.33).moveToLeft(()=>{})
        $('#arrow-2-server-process').show().repeat().fadeTo(delay * 0.165, 0.1).fadeTo(delay * 0.165, 1).until(1)
        await new Delay(delay * 0.33).sleep()
        $('#arrow-2-server-process').hide()

        $('#user-process').repeat().fadeTo(delay * 0.165, 0.1).fadeTo(delay * 0.165, 1).until(1)
        await new Delay(delay * 0.33).sleep()

    }

    /**
     * animateByHash
     * Metodo responsavel pela animacao do SOFT PARSE e do HARD PARSE
     * Verificando se o hash na shared pool existe, selecionando animacao especifica
     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
     */
    async animateByHash(hash: Hash, hashFound: boolean) {
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        //animacao do relogio no server process
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Realizando parse...'))
        $("#server-process").addClass("time-clock")
        await new Delay(5000).sleep()

        // rodar animacao especifica se o hash foi encontrado na shared-pool ou não
        if (hashFound) {
            await this.animateHashFound(hash)
        } else {
            await this.animateHashNotFound(hash)
        }
        
        //animacoes que acontecem em ambos os casos
        //pegando dados do buffer cache
        await serverProcess.animGetDataFromDbBufferCache(5000)        
        //enviando dados para user process
        await serverProcess.animSendDataToUserProcess(8000)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))        
    }

    /**
     * animateHashNotFound
     * Animacao de hash not found
     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
     */
    private async animateHashNotFound(hash: Hash) {
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let dataFiles: DataFiles = Orasim.getOracleDatabase().getDataFiles()
        let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
        let sqlConsole: SqlConsole = Orasim.getSqlConsole()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        let userProcess: UserProcess = Orasim.getUserProcess()
        let blockHtmlArr: HTMLElement[]

        //procurando sql_id na shared pool
        sqlConsole.addMsg(new SqlConsoleMsgInfo("< SP > Comando SQL não foi encontrado na <span style='font-weight: bold'>SharedPool</span>"))
        await serverProcess.animSearchSharedPool(5000)

        sqlConsole.addMsg(new SqlConsoleMsgInfo("< SP > Criando o plano de execução da query..."))
        await new Delay(3000).sleep()

        sqlConsole.addMsg(new SqlConsoleMsgInfo(
            `< SP > <span style='font-weight: bold; color: red;'>HARD Parse</span>
                     concluído, gerado 
                     <span style="font-weight: bold">SQL_ID</span>: 
                     <span style="font-weight: bold; color: ${hash.getColor()}">${hash.getHashStr()}</span>, adicionando na <span style="font-weight: bold">SharedPool</span>`))
        $("#server-process").removeClass("time-clock")

        // animacao adicionando hash na shared pool
        await serverProcess.animSearchSharedPool(5000)
        sharedPool.animateAddHash(hash)
        await new Delay(3000).sleep()

        // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache
        let memLocationArr = sharedPool.getMemoryLocation(hash)
        // animacao requisitando dados do dataFiles
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Lendo blocos em disco e carregando no <span style='font-weight: bold'>DB_BufferCache</span>"))
        await new Delay(3000).sleep()
        blockHtmlArr = serverProcess.animateGetBlockFromDataFiles(dataFiles, hash, memLocationArr, 5000)
        await new Delay(5000).sleep()
        // animacao gravando dados no dbBufferCache
        serverProcess.animateStoreBlockInDbBufferCache(blockHtmlArr, dbBufferCache, hash, memLocationArr, 5000)
        await new Delay(5000).sleep()
                
        //serverProcess.animateGetBlockFromDbBufferCache(blockHtmlArr, dbBufferCache, delay * 0.20) // animacao pegando dados do dbBufferCache
        //termino da animacao
        //await new Delay().sleep()
        //serverProcess.animateSendBlockToUserProcess(blockHtmlArr, userProcess, delay * 0.15) // animacao enviando dados para userProcess                
        // setTimeout(() => {
        //     // for(let blockHtml of blockHtmlArr)
        //     //     blockHtml.remove() //removendo block do DOM
        // }, delay)
    }

    /**
     * animateHashFound
     * Animacao de hash found
     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
     */
    private async animateHashFound(hash: Hash) {
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let dataFiles: DataFiles = Orasim.getOracleDatabase().getDataFiles()
        let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
        let sqlConsole: SqlConsole = Orasim.getSqlConsole()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        let userProcess: UserProcess = Orasim.getUserProcess()
        let blockHtmlArr: HTMLElement[]

        //comando encontrado na shared pool
        $("#server-process").removeClass("time-clock")        
        sqlConsole.addMsg(new SqlConsoleMsgInfo(
            `< SP > Comando SQL foi encontrado na 
            <span style='font-weight: bold'>SharedPool</span>`))
        sqlConsole.addMsg(new SqlConsoleMsgInfo(
            `< SP > <span style='font-weight: bold; color: red;'>SOFT Parse</span>
                     concluído.  
                     <span style="font-weight: bold">SQL_ID</span>: 
                     <span style="font-weight: bold; color: ${hash.getColor()}">${hash.getHashStr()}</span>`))
        $("#server-process").removeClass("time-clock")
        await serverProcess.animSearchSharedPool(5000)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< UP > Commando executado com sucesso!..."))

        // pegando ultimo hash adicionado         
        // animacao pegando dados do dbBufferCache
        // animacao enviando dados para userProcess
        //let memLocationArr = sharedPool.getMemoryLocation(hash)
        //blockHtmlArr = serverProcess.animateGetNewBlockFromDbBufferCache(dbBufferCache, memLocationArr, 3000)
        //await serverProcess.animSearchSharedPool(3000)
        //serverProcess.animateSendBlockToUserProcess(blockHtmlArr, userProcess, delay * 0.15)

        //termino da animacao
        // setTimeout(() => {
        //     //removendo block do DOM
        //     // for(let blockHtml of blockHtmlArr)
        //     //     blockHtml.remove()
        // }, delay)
    }
} 