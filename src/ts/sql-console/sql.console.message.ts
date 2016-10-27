/**
 * SqlConsoleMessage
 * Classe Base, responsavel por modelar as mensagens que serão inseridas no console da aplicação
 */
export class SqlConsoleMessage{    
    private msgElement: HTMLElement;

    constructor(type: string, msg: string){
        this.buildHtmlElement(type, msg)        
    }

    /**
     * buildHtmlElement
     * Metodo responsavel por criar elemento html que sera inserido no console
     * @param   type    tipo da mensagem(info ou error)
     * @param   msg     mensagem que sera impressa no console
     */
    buildHtmlElement(type: string, msg: string): void{
        this.msgElement = $(`<li class="console-li-`+type+`">`+msg+`</li>`)[0]
    }

    getMsg(): HTMLElement{
        return this.msgElement;
    }
}