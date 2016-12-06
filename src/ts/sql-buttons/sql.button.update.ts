import { Crc32 } from '../crypt/crc32'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlId } from '../crypt/sql.id'
import { AnimationUpdate } from '../animation/animation.update'
import { SqlDataContainer } from '../sql-data/sql.data.container'


export class SqlButtonUpdate{
        
    constructor(){        
        //adicionando update event handler        
        $("#btnUpdate").on('click', () => {
            this.handleUpdate()
        })
    }

    async handleUpdate(){
        //se animacao em andamento retorne
        if(Orasim.getAnimation().isAnimating())
            return
                            
        //gerando hashes diferentes a cada click do botao no insert
        let hashFound = false
        let query = 'update'
        query += Math.random().toString(36).substr(2, 5)
        let hash: Hash = new SqlId(query)
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        
        //tentando encontrar hash na shared pool
        if(sharedPool.findHash(hash))
            hashFound = true

        //adicionando hash na shared pool, caso nao encontrado(apenas logicamente, animacao eh apresentada depois)
        sharedPool.addHash(hash)
        let sqlDataContainer: SqlDataContainer = Orasim.getSqlDataContainer()
        sqlDataContainer.add(query, hash)

        await new AnimationUpdate(hash, hashFound).start()
    }
}