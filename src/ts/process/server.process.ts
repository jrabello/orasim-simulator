import { Tooltip } from '../utils/tooltip'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { DataFiles } from '../oracle-database/data.files'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { UserProcess } from './user.process'
import { Pga } from './pga'

/**
 * ServerProcess
 * Classe responsavel por modelar o objeto ServerProcess da animacao
 * @attribute {element} objeto html que referencia o elemento server-process  
 */
export class ServerProcess{
    private element: HTMLElement
    private pga: Pga
    
    constructor(){
        this.pga = new Pga()

        this.element = $("#server-process")[0]
        
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
    
    getElement(){
        return this.element
    }

    /**
     * getElementOffset
     * Metodo responsavel por retornar posicao relativa do elemento ao documento
     * @returns coordenada jquery do elemento
     */
    getElementOffset(): JQueryCoordinates{        
        return $(this.element).offset()
    }

    /**
     * animateGetBlockFromDataFiles
     * Metodo responsavel por animar os blocks que o server-process pega do data-files
     * @param {dataFiles} objeto html que representa o DataFiles
     * @param {delay} tempo de animacao
     * @returns retorna o novo bloco criado(htmlElement) dentro do datafiles  
     */
    animateGetBlockFromDataFiles(dataFiles: DataFiles, delay: number): HTMLElement{        
        let blockHtml = dataFiles.getNewBlockHtml()
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () =>{
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DataFiles'))   
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Lendo blocos em disco e carregando no <span style='font-weight: bold'>DB_BufferCache</span>"))                         
            //$('#data-files').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            //$(blockHtml).repeat().fadeTo(delay/2, 1).fadeTo(delay/2, 1).until(1)
        }, () =>{})
        return blockHtml
    }

    
    /**
     * animateStoreBlockInDbBufferCache
     * Metodo responsavel por animar o bloco sendo salvo no db-buffer-cache
     * @param {blockHtml} objeto html que representa o bloco animado
     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
     * @param {delay} tempo de animacao 
     */
    animateStoreBlockInDbBufferCache(blockHtml: HTMLElement, dbBufferCache: DbBufferCache, memLocation: number, delay: number): void{        
        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getBlocks()[memLocation].getElement(), delay, delay/6, () =>{
            // no inicio da animacao piscar server-process e db-buffer-cache 
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
            $('#db-buffer-cache').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess gravando dados no DbBufferCache'))            
        }, () => { 
            // depois da animacao completa marcando o bloco como utilizado            
            dbBufferCache.setMemoryLocationUsed(memLocation)            
        })
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
    animateGetNewBlockFromDbBufferCache(dbBufferCache: DbBufferCache, memLocation: number, delay: number): HTMLElement{
        let blockHtml = dbBufferCache.getNewBlockHtmlAt(memLocation)        
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () =>{
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
            $('#db-buffer-cache').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DbBufferCache'))
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>")) 
        }, () =>{})
        return blockHtml
    }

    /**
     * animateGetBlockFromDbBufferCache
     * Metodo responsavel por animar o server-process extraindo um bloco JA EXISTENTE(criado em outro lugar) do db-buffer-cache
     * @param {blockHtml} objeto html que representa o bloco animado    
     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
     * @param {delay} duracao de animacao     
     */
    animateGetBlockFromDbBufferCache(blockHtml: HTMLElement, dbBufferCache: DbBufferCache, delay: number): void{        
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () => {
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
            $('#db-buffer-cache').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"))
            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess ')) 
        }, () => {})
    }
    /**
     * animateSendBlockToUserProcess
     * Metodo responsavel por enviar bloco ao user-process
     * @param {blockHtml} objeto html que representa o bloco animado
     * @param {userProcess} objeto html que representa o user-process
     * @param {delay} duracao da animacao
     */    
    animateSendBlockToUserProcess(blockHtml: HTMLElement, userProcess: UserProcess, delay: number){        
        Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay, 0, () => {
            //no inicio da animacao, piscar user-process e server-process     
            $('.arrow.from-serverp-2-userp').show()      
            $('.arrow.from-serverp-2-userp').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1).wait().hide()
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            $('#user-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            $('#user img').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Retornando resultado para <span style='font-weight: bold'>UserProcess</span>"))
            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess enviando dados para UserProcess'))
        }, 
        () => {
            //no final da animacao
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< UP > Comando executado com sucesso'))
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< UP > Aguardando nova solicitação...'))
            
        })
    }
} 