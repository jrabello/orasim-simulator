import { DataFiles } from '../oracle-database/data.files'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { UserProcess } from './user.process'

export class ServerProcess{
    private element: HTMLElement;

    constructor(){
        this.element = $("#server-process")[0]
    }
    
    getElement(){
        return this.element
    }

    getElementOffset(): JQueryCoordinates{        
        return $(this.element).offset()
    }

    animateGetBlockFromDataFiles(dataFiles: DataFiles, delay: number): HTMLElement{
        let blockHtml = dataFiles.getNewBlockHtml()
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () =>{
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)                            
            //$('#data-files').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            //$(blockHtml).repeat().fadeTo(delay/2, 1).fadeTo(delay/2, 1).until(1)
        }, () =>{})
        return blockHtml
    }
    
    animateStoreBlockInDbBufferCache(blockHtml: HTMLElement, dbBufferCache: DbBufferCache, memLocation: number, delay: number){
        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getBlocks()[memLocation].getElement(), delay, delay/6, () =>{
            // no inicio da animacao piscar server-process e db-buffer-cache 
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
            $('#db-buffer-cache').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
        }, () => { 
            // depois da animacao completa marcando o bloco como utilizado            
            dbBufferCache.setMemoryLocationUsed(memLocation)            
        })
    }

    animateGetNewBlockFromDbBufferCache(dbBufferCache: DbBufferCache, memLocation: number, delay: number): HTMLElement{
        let blockHtml = dbBufferCache.getNewBlockHtmlAt(memLocation)        
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () =>{
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
            $('#db-buffer-cache').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1) 
        }, () =>{})
        return blockHtml
    }

    animateGetBlockFromDbBufferCache(blockHtml: HTMLElement, dbBufferCache: DbBufferCache, delay: number){
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, () => {
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)            
            $('#db-buffer-cache').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1) 
        }, () => {})
    }
        
    animateSendBlockToUserProcess(blockHtml: HTMLElement, userProcess: UserProcess, delay: number){
        Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay, 0, () => {
            //no inicio da animacao, piscar user-process e server-process     
            $('.arrow.from-serverp-2-userp').show()      
            $('.arrow.from-serverp-2-userp').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1).wait().hide()
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            $('#user-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            $('#user img').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        }, 
        () => {})
    }
} 