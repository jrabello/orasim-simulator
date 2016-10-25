import { Arrow } from '../animation/arrow'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'

/**
 * UserProcess
 * Classe responsavel por modelar o objeto UserProcess da animacao
 * @attribute {element} objeto html que referencia o elemento user-process  
 */
export class UserProcess {
    private element: HTMLElement

    constructor() {
        this.element = $("#user-process")[0]
        // criando tooltip para user-process
        $('#user-process').qtip({
            suppress: false,
            content: {
                        text: 'A great way to show a persistent tooltip with an easy close method',
                        title: {
                            text: 'Combined title and button',
                            button: true
                        }
                    },
            show: { event: 'click' },
            style: { classes: 'qtip-light' },
            hide:{ 
                event: 'click',
                inactive: 1500
            }
        })
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
                Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('Userprocess Enviando dados para ServerProcess'))
                $("#user-process").fadeTo(delay*0.15, 1, () => {
                    new Arrow(240, 80, 80, 80, delay*0.40).moveToRight(() => {
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