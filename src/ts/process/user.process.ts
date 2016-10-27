import { Tooltip } from '../utils/tooltip'
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
        new Tooltip("#user-process", "User Process", "Eu sou o user-process!")
    }

    getElement() {
        return this.element
    }

    /**
     * animateSendDataToServerProcess
     * Metodo responsavel por animar o envio de dados ao server-process     
     * @param {delay} duracao da animacao
     * @param {nameComando} nome do comando que sera enviado para server process
     * @returns uma promise retornada logo apos o tempo de animacao
     */
    animateSendDataToServerProcess(delay: number, nameComando: string): Promise < number > {
        return new Promise < number > ((resolve, reject) => {
            $("#user-process").fadeTo(delay * 0.15, 0.1, () => { //user process iniciando a piscar              
                $("#user-process").fadeTo(delay * 0.15, 1, () => { //user process parando de piscar
                    Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< UP > Enviando comando ' + nameComando + ' para <span style="font-weight: bold">ServerProcess</span>'))
                    new Arrow(240, 80, 80, 80, delay * 0.40).moveToRight(() => { //desenhando arrow
                        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Realizando parse e criando plano de execução da query'))
                        $("#server-process").fadeTo(delay * 0.15, 0.1, () => {
                            $("#server-process").fadeTo(delay * 0.15, 1)
                        })
                    })
                })
            })
            setTimeout(() => {
                resolve(0)
            }, delay)
        })
    }

    /**
     * animateSendDataToListener
     * Metodo responsavel por animar o envio de dados ao listener     
     * @param {delay} duracao da animacao
     * @returns uma promise retornada logo apos o tempo de animacao
     */
    animateSendDataToListener(delay: number): Promise < number > {
        return new Promise < number > ((resolve, reject) => {
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< UP > Solicitando conexão com o <span style='font-weight: bold'>DB</span> através do <span style='font-weight: bold'>Listener</span>"))
            $("#user-process").fadeTo(delay * 0.25, 0.1, () => {
                $("#user-process").fadeTo(delay * 0.25, 1, () => {
                    new Arrow(355, 45, 20, 170, delay * 0.50).moveToUpRight(() => {
                    })
                })
            })
            setTimeout(() => {
                resolve(0)
            }, delay)
        })
    }

}