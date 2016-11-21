/**
 * Block
 * Classe Responsavel modelar um bloco (data block)
 * @attribute {size} define o tamanho de um bloco
 * @attribute {element} objeto html que referencia o elemento user-process
 * @attribute {isUsed} flag que determina se o bloco esta em uso
 */
export class DataBlock{
    private size: number    
    private element: HTMLElement
    private isUsed: boolean
    private color: string

    constructor() {
        this.element = $(`<div class="cache-box"></div>`)[0]        
        this.size = 4096
        this.isUsed = false
        this.color = "#ffffff"
    }
    
    /**
     * setUsed
     * Metodo responsavel pela animacao de marcar o bloco como usado no db-buffer-cache
     * @param {flag} setando isUsed como usada ou livre
     */
    setUsed(flag: boolean, color: string): void{
        this.isUsed = flag
        //$(this.element).css("background-color","#f00")
        this.setColor(color)
    }

    /**
     * setColor
     * Metodo responsavel ppor setar cor do block
     * @param {color} cor no seguinte formato #ffffff
     */
    setColor(color: string): void{
        this.color = color
        $(this.element).css("background-color", this.color)
    }

    getColor(): string{
        return this.color
    }

    getElement(): HTMLElement{
        return this.element
    }    
}