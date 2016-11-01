import { DataBlock } from '../utils/data.block'

/**
 * DataFiles
 * Classe responsavel por modelar o objeto Data-Files do oracle database
 * @attribute {blocks} array de objetos que guarda os blocos do data-files
 * @attribute {element} objeto html que referencia o elemento data-files 
 */
export class DataFiles{
    private blocks: DataBlock[]
    private element: HTMLElement

    constructor(){    
        this.blocks = new Array<DataBlock>()
        this.element = $("#data-files")[0]    
    }
    
    /**
     * getNewBlockHtml
     * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao
     * @returns retorna objeto html(Block) para ser animado  
     */
    getNewBlockHtml(): HTMLElement{
        let newBlock = new DataBlock()  
        
        //criando block dentro do data-files        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")

        return newBlock.getElement()
    } 
}