import { SqlParser } from '../sql-parser/sql.parser'
import { Crc32 } from '../crypt/crc32'
import { Hash } from '../crypt/hash'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { DataFiles } from '../oracle-database/data.files'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlConsole } from '../sql-console/sql.console'
import { SqlConsoleMessage } from '../sql-console/sql.console.message'
import { SqlConsoleMsgError } from '../sql-console/sql.console.msg.error'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'

/**
 * Animation
 * Classe Base, responsavel por implementar animações 
 * em comum com classes filhas
 * @property {delay} quantidade de milisegundos usado como base na animacao
 * @property {animating} atributo que salva o estado booleano da animacao 
 */
export class Animation {
    private delay: number
    private animating: boolean

    constructor() {        
        this.delay = 1000
        this.animating = false
    }

    /**
     * start
     * Este metodo desta classe base não executa nenhuma animação     
     */
    start() : void{        
    }

    /**
     * isAnimating
     * @returns retorna estado atual da animacao
     */
    isAnimating(): boolean{
        return this.animating
    }

    /**
     * 
     * setAnimating
     * Muda o estado atual da animacao
     * @param {flag} identifica o estado atual da animacao 
     */
    setAnimating(flag: boolean): void{
        this.animating = flag
    }

    /**
     * getDelay
     * @returns retorna o delay atual(milisegundos)
     */
    getDelay(): number{
        return this.delay
    }

    /**
     * moveTo
     * Este metodo move um objeto html para a posicao de outro
     * @param {sourceElem} objeto de origem (que será movido) 
     * @param {destElem} objeto de destino (para onde será movido)
     * @param {duration} duracao da animacao(milisegundos)
     * @param {delayAfter} pausar a animacao no final da mesma, por determinado tempo(milisegundos)
     * @param {startCb} callback de inicializacao da animação
     * @param {completeCb} callback de finalizacao da animação
     */
    moveTo(sourceElem: HTMLElement, destElem: HTMLElement, duration: number, delayAfter: number, startCb: Function, completeCb: Function): void{
        let x: number
        let y: number

        x = $(destElem).offset().top - $(sourceElem).offset().top +  $(sourceElem).position().top
        y = ($(destElem).offset().left - $(sourceElem).offset().left) +  $(sourceElem).position().left
        
        $(sourceElem).animate( { top: x, left: y },        
                               { duration: duration,                                 
                                 start:  () => startCb(),
                                 complete: () => completeCb() }).delay(delayAfter)       
    }
}