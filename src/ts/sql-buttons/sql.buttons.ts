import { SqlButtonSelect } from './sql.button.select'
import { AnimationConnect } from '../animation/animation.connect'

export class SqlButtons{
    private sqlButtonSelect: SqlButtonSelect

    constructor(){
        //adicionando connect event handler        
        $("#btnConnect").on('click', () => {
            this.handleConnect()
        })
        //criando instancia de button select
        this.sqlButtonSelect = new SqlButtonSelect()
    }
    
    handleConnect(): void{        
        new AnimationConnect().start()
    }
    
}