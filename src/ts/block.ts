/**
 * Block
 * Classe Responsavel modelar um bloco
 * @attribute {size} define o tamanho de um bloco
 * @attribute {element} objeto html que referencia o elemento user-process
 * @attribute {isUsed} flag que determina se o bloco esta em uso 
 */
export class Block{
    private size: number    
    private element: HTMLElement
    private isUsed: boolean

    constructor() {
        this.element = $(`<div class="cache-box"></div>`)[0]        
        this.size = 4096
        this.isUsed = false
    }

    /**
     * setUsed
     * Metodo responsavel pela animacao de marcar o bloco como usado no db-buffer-cache
     * @param {flag} setando isUsed como usada ou livre
     */
    setUsed(flag: boolean){
        this.isUsed = flag
        $(this.element).css("background-color","#f00")
    }

    getElement(): HTMLElement{
        return this.element
    }
    
}