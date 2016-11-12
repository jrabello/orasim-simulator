import { AnimationConnect } from '../animation/animation.connect'

export class SqlButtonConnect{

    constructor(){
        //adicionando connect event handler        
        $("#btnConnect").on('click', () => {
                this.handleConnect()
        })
    }

    handleConnect(): void {
        //se animacao em andamento retorne
        if(Orasim.getAnimation().isAnimating())
            return
        new AnimationConnect().start()
    }

    /**
     * undisplayConnectDisplayCommandButtons
     * Metodo responsavel por trocar botao de connect pelos botoes de commandos no banco     
     * @returns uma promise retornada logo apos o tempo de animacao
     */
    undisplayConnectDisplayCommandButtons(): Promise < number > {
        return new Promise < number > ((resolve, reject) => {
            $("#btnConnect").addClass("displayNone")
            $(".btnCommands").removeClass("displayNone")
            resolve(0)
        })
    }
}