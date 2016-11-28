import {Block} from './block'

/**
 * DataBlockRedo
 * Classe Responsavel modelar um bloco (data block redo)
 */
export class DataBlockRedo extends Block{
    
    constructor() {
        super(
            $(`<div class="buffer-box"></div>`)[0],
            4096,
            false,
            "#ffffff"
        )
    }        
}