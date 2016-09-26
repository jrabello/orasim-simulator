import { Block } from '../block' 

export class DbBufferCache{
    private blocks: Block[]
    private numBlocks: number

    constructor(){
        
    }
    
    getMemoryLocation(index: number): number{
        return 0
    }
}