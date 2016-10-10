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


    getBlockFromDatFiles(dataFiles: DataFiles, delay: number): HTMLElement{
        let blockHtml = dataFiles.getNewBlockHtml()
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay)
        return blockHtml
    }

    //DbBufferCache
    getNewBlockFromDbBufferCache(dbBufferCache: DbBufferCache, delay: number): HTMLElement{
        let blockHtml = dbBufferCache.getNewBlockHtml()
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay)
        return blockHtml
    }
    storeBlockInDbBufferCache(blockHtml: HTMLElement, dbBufferCache: DbBufferCache, memLocation: number, delay: number){
        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getElement(), delay, () => {
            dbBufferCache.setMemoryLocationUsed(memLocation)
        })
    }
    getBlockFromDbBufferCache(blockHtml: HTMLElement, dbBufferCache: DbBufferCache, delay: number){
        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay)
    }
    
    //UserProcess
    sendDataToUserProcess(blockHtml: HTMLElement, userProcess: UserProcess, delay: number){
        Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay)
    }
} 