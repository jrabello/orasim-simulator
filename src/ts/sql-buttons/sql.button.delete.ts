import { SqlDataContainer } from '../sql-data/sql.data.container'
import { AnimationDelete } from '../animation/animation.delete'
import { Crc32 } from '../crypt/crc32'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlId } from '../crypt/sql.id'

export class SqlButtonDelete{
        
    constructor(){        
        //adicionando update event handler        
        $("#btnDelete").on('click', () => {
            this.handleDelete()
        })
    }

    async handleDelete(){
        //se animacao em andamento retorne
        if(Orasim.getAnimation().isAnimating())
            return
                            
        //gerando hashes diferentes a cada click do botao no insert
        let hashFound = false
        let query = 'delete'
        query += Math.random().toString(36).substr(2, 5)
        let hash: Hash = new SqlId(query)
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()

        //adicionando hash na shared pool, caso nao encontrado(apenas logicamente, animacao eh executada depois)
        sharedPool.addHash(hash)
        let sqlDataContainer: SqlDataContainer = Orasim.getSqlDataContainer()
        sqlDataContainer.add(query, hash)

        await new AnimationDelete(hash).start()
    }
}