import { AnimationRollback } from '../animation/animation.rollback'

export class SqlButtonRollback{
    contructor(){
         $("#btnRollback").on('click', () => {
            this.handleRollback()
        })
    }

    handleRollback(): void{
        if(Orasim.getAnimation().isAnimating())
            return
        
        new AnimationRollback().start()
    }
}