import { Block } from './block'

/**
 * DataBlock
 * Classe Responsavel modelar um bloco (data block)
 */
export class DataBlock extends Block{
    
    constructor() {
        super(
            $(`<div class="cache-box"></div>`)[0],
            4096,
            false,
            "#ffffff"
        )
        // super.element =         
        // this.size = 4096
        // this.isUsed = false
        // this.color = "#ffffff"
    }
    
}