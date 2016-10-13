import { Block } from '../block'

export class DataFiles{
    private block: Block
    private element: HTMLElement

    constructor(){
        this.block = new Block()
        this.element = $("#data-files")[0]
        //$(this.element).append(this.block.getElement())
    }

    // returns existing block
    getBlock(): HTMLElement{
        return this.block.getElement()
    }

    // returns a new block, only for animation purposes
    getNewBlockHtml(): HTMLElement{
        let newBlock = new Block()  
        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        $(newBlock.getElement()).css("z-index", 100)

        return newBlock.getElement()
    } 
}