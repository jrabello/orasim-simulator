import { Arrow } from '../animation/arrow'

export class UserProcess {
    private element: HTMLElement;

    constructor() {
        this.element = $("#user-process")[0]
    }

    getElement() {
        return this.element
    }

    animateSendDataToServerProcess(delay: number) {
        //delay = 5000
        //$("#user-process").animate({},{queue: "anim", start: () =>{
            $("#user-process").fadeTo(delay*0.15, 0.1, () => {
                $("#user-process").fadeTo(delay*0.15, 1, () => {
                    new Arrow('right', 240, 80, 80, delay*0.40).moveToRight(() => {
                        $("#server-process").fadeTo(delay*0.15, 0.1, () => {
                            $("#server-process").fadeTo(delay*0.15, 1, () => {
                                console.log('done')
                            })
                        })
                    })
                })
            })
        //}})
        //breakpoint

        // $("#user-process").animate({
        // },{
        //     duration: delay,
        //     start: () => {
        //         console.log("start")
        //         // $('#user-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        //         // $('#user img').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        //     },
        //     complete:  () => {
        //         console.log("complete")
        //         //$('.arrow.from-userp-2-serverp').show()
        //         // $('#server-process').show()
        //         // $('.arrow.from-userp-2-serverp').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1).wait().hide()
        //         // $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        //         new Arrow('right', 45, 45, 120, delay).moveToRight()                    
        //     }

        // })



        // Orasim.getAnimation().moveTo($(".main-title")[0], $(".main-title")[0], delay, 0, () => {
        //     //no inicio da animacao, piscar user-process, server-process, e seta           
        //     $('.arrow.from-userp-2-serverp').show()
        //     $('#server-process').show()
        //     $('.arrow.from-userp-2-serverp').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1).wait().hide()
        //     $('#server-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        //     $('#user-process').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        //     $('#user img').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
        // }, 
        // () => {})
    }
}