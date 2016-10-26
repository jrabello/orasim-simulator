export class Pmon{
    private element: HTMLElement

    constructor(){
        this.element = $('#pmon')[0]
        //tooltip do pmon
        $('#pmon').qtip({
            suppress: false,
            content: {
                        title: {
                            text: 'Pmon',
                            button: true                            
                        },
                        text: 'Olá, eu sou o pmon!'
                    },
            show: { event: 'click' },
            style: { classes: 'qtip-light' },
            hide:{ event: 'click' }
        })
    }
}