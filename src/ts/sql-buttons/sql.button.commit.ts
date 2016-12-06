import { AnimationCommit } from '../animation/animation.commit'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlId } from '../crypt/sql.id'

export class SqlButtonCommit{
    
    constructor(){
        //adicionando connect event handler        
        $("#btnCommit").on('click', () => {
            this.handleCommit()
        })
    }

    handleCommit(): void{
        if(Orasim.getAnimation().isAnimating())
            return
        
        new AnimationCommit().start()
    }
}