import { AnimationRollback } from '../animation/animation.rollback'

export class SqlButtonRollback{
    
    constructor(){
        console.log("SqlButtonRollback!")
         $("#btnRollback").on('click', () => {
            this.handleRollback()
        })
    }

    handleRollback(): void{
        console.log("handleRollback!")
        if(Orasim.getAnimation().isAnimating())
            return
        
        new AnimationRollback().start()
    }
}