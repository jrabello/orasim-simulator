import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { DataFiles } from '../oracle-database/data.files'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { UserProcess } from './user.process'

/**
 * ServerProcess
 * Classe responsavel por modelar o objeto ServerProcess da animacao
 * @attribute {element} objeto html que referencia o elemento shared-pool  
 */
export class ServerProcess{
    private element: HTMLElement;
    
    constructor(){
        this.element = $("#server-process")[0]
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
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DataFiles'))                            
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
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess gravando dados no DbBufferCache'))            
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
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DbBufferCache')) 
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
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DbBufferCache')) 
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
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess enviando dados para UserProcess'))
        }, 
        () => {})
    }
} 