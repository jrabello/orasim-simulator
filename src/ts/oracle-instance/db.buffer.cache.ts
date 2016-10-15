import { Block } from '../block'

/**
 * DbBufferCache
 * Classe responsavel por modelar o objeto DbBufferCache do oracle instance
 * @attribute {numBlocks} numero de blocks default que irao preencher o DbBufferCache 
 * @attribute {element} objeto html que referencia o elemento db-buffer-cache 
 * @attribute {blocks} array de objetos que guarda os blocos do data-files
 */
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

    /**
     * initBlocks
     * Metodo responsavel por adicionar dinamicamente os blocos dentro do db-buffer-cache     
     */
    initBlocks(): void{
        for (let i = 0; i < this.numBlocks; i++) {
            let block = new Block()
            this.blocks.push(block)
            $('#db-buffer-cache-container').append(block.getElement())
        }
    }

    /**
     * setMemoryLocationUsed
     * Metodo responsavel por marcar uma area de memoria como utilizada
     * @param {memLocation} numero de id da localizacao da memoria
     */
    setMemoryLocationUsed(memLocation: number){
        this.blocks[memLocation].setUsed(true)
    }

    /**
     * getNewBlockHtml
     * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao 
     * @returns retorna objeto html(Block) para ser animado  
     */
    getNewBlockHtml(): HTMLElement{
        let newBlock = new Block()
        
        //adicionando elemento no DOM dinamicamente        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        //$(newBlock.getElement()).css("z-index", 100)

        return newBlock.getElement()
    } 

    /**
     * getNewBlockHtmlAt
     * Metodo responsavel por retornar novo objeto html que sera utilizado na animacao numa posicao de memoria especifica
     * @param {memLocation} numero de id da localizacao da memoria
     * @returns retorna objeto html(Block) para ser animado  
     */
    getNewBlockHtmlAt(memLocation: number): HTMLElement{
        let newBlock = new Block()
        
        //adicionando elemento no DOM dinamicamente        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.getBlocks()[memLocation].getElement()).offset())
        $(newBlock.getElement()).css("position", "absolute")
        //$(newBlock.getElement()).css("z-index", 100)
        
        return newBlock.getElement()
    }

    getElement() {
        return this.element
    }

    getBlocks(): Block[]{
        return this.blocks
    }
}