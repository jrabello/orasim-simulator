import { Block } from '../block'

export class DbBufferCache {    
    private numBlocks: number
    private element: HTMLElement
    private blocks: Block[]

    constructor() {
        this.numBlocks = 30
        this.element = $('#db-buffer-cache')[0]
        this.blocks = new Array<Block>()
        this.initBlocks()
    }

    initBlocks(){
        for (let i = 0; i < this.numBlocks; i++) {
            let block = new Block()
            this.blocks.push(block)
            $('#db-buffer-cache').append(block.getElement())
        }
    }

    setMemoryLocationUsed(memLocation: number){
        this.blocks[memLocation].setUsed(true)
    }

    // getMemoryLocation(index: number): number {
    //     return 0
    // }
    getNewBlockHtml(): HTMLElement{
        let newBlock = new Block()
        //$(newBlock.getElement()).css("top", "0px") 
        //$(newBlock.getElement()).css('left', "0px")        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        $(newBlock.getElement()).css("z-index", 100)
        return newBlock.getElement()
    } 

    getElement() {
        return this.element
    }
}