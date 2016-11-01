import { Tooltip } from '../utils/tooltip'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { Arrow } from '../animation/arrow'

/**
 * ListenerProcess
 * Classe responsavel por modelar o objeto ListenerProcess da animacao
 * @attribute {element} objeto html que referencia o elemento listener-process  
 */
export class ListenerProcess {
    private element: HTMLElement;

    constructor() {
        this.element = $("#listener-process")[0]

        // criando tooltip para o Listener
        let tooltip = new Tooltip("#listener-process", "Listener", 
        `
        <p align="justify">

        Os passos básicos pelo qual um processo cliente (UserProcess) estabelece uma conexão através com um Listener são:
        <br><br>
        1. Um processo cliente ou outro banco de dados solicita uma conexão.
        <br><br>
        2. O Listener seleciona um "service handler" (manipulador de serviço) adequado para atender à solicitação do client e encaminha a solicitação para o manipulador.
        <br><br>    
        3. O processo cliente conecta-se diretamente no "service handler" (manipulador de serviço). O Listener não está envolvida na comunicação.
        
        <span style='font-weight: bold'>
        </span>
         `
        )
    }

    getElement() {
        return this.element
    }

    /**
     * getElementOffset
     * Metodo responsavel por retornar posicao relativa do elemento ao documento
     * @returns coordenada jquery do elemento
     */
    getElementOffset(): JQueryCoordinates {
        return $(this.element).offset()
    }

    /**
     * animateSendDataToServer
     * Metodo responsavel por animar o envio de dados ao server process     
     * @param {delay} duracao da animacao
     * @returns uma promise retornada logo apos o tempo de animacao
     */
    animateSendDataToServer(delay: number): Promise < number > {
        return new Promise < number > ((resolve, reject) => {
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< LN > Validando informações da conexão"))
            $("#listener-process").fadeTo(delay * 0.25, 0.1, () => {
                $("#listener-process").fadeTo(delay * 0.25, 1, () => {
                    Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< LN > Iniciando o <span style='font-weight: bold'>ServerProcess</span> dedicado"))
                    new Arrow(20, 190, 25, 210, delay * 0.50).moveToRightDown(() => {
                        $("#server-process").removeClass("displayNone")
                        $("#pga").removeClass("displayNone")
                    })
                })
            })
            setTimeout(() => {
                resolve(0)
            }, delay)
        })
    }

    /**
     * animateConnectToServer
     * Metodo responsavel por animar a conexão com o server process     
     * @param {delay} duracao da animacao
     * @returns uma promise retornada logo apos o tempo de animacao
     */
    animateConnectToServer(delay: number): Promise < number > {
        return new Promise < number > ((resolve, reject) => {
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< UP > Conectando diretamente com o <span style='font-weight: bold'>ServerProcess</span>"))

            $("<div class='right-arrow end'>").css({
                "left": "95px",
                "top": "265px",
                "width": "40px"
            }).hide().appendTo("#animation-container").fadeTo(delay * 1, 1)

            setTimeout(() => {
                resolve(0)
            }, delay)

            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< UP > Conexão estabelecida com o <span style='font-weight: bold'>Database</span>"))
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< UP > Aguardando solicitação..."))
        })
    }

}