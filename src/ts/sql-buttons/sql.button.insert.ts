import { AnimationInsert } from '../animation/animation.insert'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlId } from '../crypt/sql.id'
import { SqlDataContainer } from '../sql-data/sql.data.container'

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

        //gerando hashes diferentes a cada click do botao no insert
        let hashFound = false
        let query = 'insert'
        query += Math.random().toString(36).substr(2, 5)
        let hash: Hash = new SqlId(query)
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()

        //tentando encontrar hash na shared pool
        if(sharedPool.findHash(hash))
            hashFound = true
                
        //adicionando hash na shared pool, caso nao encontrado
        sharedPool.addHash(hash)
        let sqlDataContainer: SqlDataContainer = Orasim.getSqlDataContainer()
        sqlDataContainer.add(query, hash)

        await new AnimationInsert(hash, hashFound).start()
    }
}