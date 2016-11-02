import { SqlButtonSelect } from './sql.button.select'
import { AnimationConnect } from '../animation/animation.connect'

export class SqlButtons {
    private sqlButtonSelect: SqlButtonSelect

    constructor() {
        //adicionando connect event handler        
        $("#btnConnect").on('click', () => {
                this.handleConnect()
        })
        //criando instancia de button select
        this.sqlButtonSelect = new SqlButtonSelect()
    }

    handleConnect(): void {
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
        })
    }

}