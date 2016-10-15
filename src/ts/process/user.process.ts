import { Arrow } from '../animation/arrow'

/**
 * UserProcess
 * Classe responsavel por modelar o objeto UserProcess da animacao
 * @attribute {element} objeto html que referencia o elemento user-process  
 */
export class UserProcess {
    private element: HTMLElement

    constructor() {
        this.element = $("#user-process")[0]
    }

    getElement() {
        return this.element
    }

    /**
     * animateSendDataToServerProcess
     * Metodo responsavel por animar o envio de dados ao server-process     
     * @param {delay} duracao da animacao
     * @returns uma promise retornada logo apos o tempo de animacao
     */    
    animateSendDataToServerProcess(delay: number): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            $("#user-process").fadeTo(delay*0.15, 0.1, () => {
                $("#user-process").fadeTo(delay*0.15, 1, () => {
                    new Arrow('right', 240, 80, 80, delay*0.40).moveToRight(() => {
                        $("#server-process").fadeTo(delay*0.15, 0.1, () => {
                            $("#server-process").fadeTo(delay*0.15, 1)
                        })
                    })
                })
            })
            setTimeout(() => {
                resolve(0) 
            }, delay)
        })
    }
}