import { AnimationSelect } from '../animation/animation.select'
import { Crc32 } from '../crypt/crc32'
import { Hash } from '../crypt/hash'
import { SharedPool } from '../oracle-instance/shared.pool'
import { SqlId } from '../crypt/sql.id'

export class SqlButtonSelect{
        
    constructor(){        
        //adicionando select event handler        
        $("#btnSelect").on('click', () => {
            this.handleSelect()
        })
    }

    handleSelect(): void{
        //se animacao em andamento retorne
        if(Orasim.getAnimation().isAnimating())
            return
                            
        //gerando o mesmo hash(crc do 'select') para todos os clicks
        let hashFound = false
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let query = 'select'            
        let hash: Hash = new SqlId(query)
        //tentando encontrar hash na shared pool
        if(sharedPool.findHash(hash))
            hashFound = true
        //adicionando na shared pool, caso nao encontrado
        sharedPool.addHash(hash)        
        new AnimationSelect(hash, hashFound).start()
    }
}