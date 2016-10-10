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
        $(this.element).append(newBlock.getElement())
        return newBlock.getElement()
    } 
}