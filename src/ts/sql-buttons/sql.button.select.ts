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
        //gerando o mesmo hash(crc do 'select') para todos os clicks
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let query = 'select'            
        //let hash: Hash = new Crc32(query)
        let hash: Hash = new SqlId(query)                
        let isHashFound = sharedPool.findHash(hash)
                
        // caso o hash nao seja encontrado, adicione na shared-pool 
        if(!isHashFound)
            sharedPool.addHash(hash)               

        new AnimationSelect(isHashFound).start()
    }
}