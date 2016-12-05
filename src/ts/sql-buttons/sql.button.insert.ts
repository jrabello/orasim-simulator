import { AnimationInsert } from '../animation/animation.insert'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlId } from '../crypt/sql.id'

export class SqlButtonInsert{
    
    constructor(){
        //adicionando connect event handler        
        $("#btnInsert").on('click', () => {
            this.handleInsert()
        })
    }

    async handleInsert(){
        if(Orasim.getAnimation().isAnimating())
            return

        //gerando hashes diferentes a cada click do botao
        let hashFound = false
        let query = 'insert'
        query += Math.random().toString(36).substr(2, 5)
        let hash: Hash = new SqlId(query)                
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        
        //adicionando hash na shared pool, caso nao encontrado
        sharedPool.addHash(hash)                       

        await new AnimationInsert(hash).start()
    }
}