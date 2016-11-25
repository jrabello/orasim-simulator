export class Tooltip{

    /**
     * constructor
     * Metodo responsavel por incluir a tooltip nos elementos
     * @param {idElement} id seletor do elemento html que recebera a tooltip
     * @param {title} titulo da janela
     * @param {text} texto dentro da janela
     */
    constructor(idElement: string, title: string, text: string){
        this.genToolTip(idElement, title, text)
    }

    genToolTip(idElement: string, title: string, text: string): void{
        // criando tooltip para elemento
        $(idElement).qtip({
            suppress: false,
            content: {
                        title: {
                            text: title,
                            button: true                            
                        },
                        text: text+'<br><br>'
                    },
            show: { event: 'click' },
            style: { classes: 'qtip-light'},
            hide:{ event: 'click' },
            position: {
                  target: 'mouse',
                  adjust: { mouse: false }
            }
            //position: { at: 'top left'}
        })
    }
}