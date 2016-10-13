export class UserProcess{
    private element: HTMLElement;

    constructor(){
        this.element = $("#user-process")[0]
    }
    
    getElement(){
        return this.element
    }

    animateSendDataToServerProcess(delay: number){       
        Orasim.getAnimation().moveTo($(".main-title")[0], $(".main-title")[0], delay, 0, () => {
            //no inicio da animacao, piscar user-process, server-process, e seta           
            $('.arrow.from-userp-2-serverp').show()
            $('#server-process').show()
            $('.arrow.from-userp-2-serverp').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1).wait().hide()
            $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            $('#user-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
            $('#user img').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        }, 
        () => {})
    }
}