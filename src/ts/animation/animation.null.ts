import { Animation } from './animation'

/**
 * AnimationNull
 * Classe filha, responsavel por implementar especializacao de uma animacao vazia(seguindo null object pattern) 
 */
export class AnimationNull extends Animation{
    constructor(){
        super()
    }    
}