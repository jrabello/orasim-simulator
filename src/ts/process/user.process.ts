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
        
        // criando tooltip para o UserProcess
        let tooltip = new Tooltip("#user-process", "User Process", 
        `
        <p align="justify">

        Quando um usuário executa uma aplicação, como por exemplo o SQL*Plus, o sistema operacional cria um processo cliente (User Process) para executar a aplicação do usuário.
        <br><br>
        <span style='font-weight: bold'>
        User Process e Server Process
        </span>
        <br><br>
        Os User Process diferem em aspectos importantes dos Server Process que interagem diretamente com a instância.
        <br><br>
        Os Server Process trabalham para o User Process realizando leitura e escrita na SGA, ao passo que o User Process não pode fazer isso.
        <br><br>
        Um User Process pode ser executado em um host diferente do host em que o banco está, enquanto que o Server Process não pode.
        `
        )
    }

    getElement() {
        return this.element
    }

    /**
     * createUserProcess
     * Metodo responsavel por animar a criacao do user process     
     * @param {delay} duracao da animacao
     * @returns uma promise retornada logo apos o tempo de animacao
     */
    createUserProcess(delay: number): Promise < number > {
        return new Promise < number > ((resolve, reject) => {
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< UP > Criando <span style="font-weight: bold">UserProcess</span>'))
            $("#user").fadeTo(delay * 0.4, 0.1, () => {
                $("#user").fadeTo(delay * 0.4, 1, () => {
                    $("#user-process").removeClass("displayNone")
                })
            })
            setTimeout(() => {
                resolve(0)
            }, delay)
        })
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
            $("#user-process").fadeTo(delay * 0.25, 0.1, () => {              
                $("#user-process").fadeTo(delay * 0.25, 1, () => {
                    Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< UP > Enviando comando <span style='font-weight: bold'>" + nameComando + "</span> para o <span style='font-weight: bold'>ServerProcess</span>"))
                    $("#connection-arrow").fadeTo(delay * 0.25, 0.1, () => {
                        $("#connection-arrow").fadeTo(delay * 0.25, 1)
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