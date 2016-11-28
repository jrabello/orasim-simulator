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

    handleInsert(): void{
        if(Orasim.getAnimation().isAnimating())
            return

        //gerando o mesmo hash(crc do 'select') para todos os clicks
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let query = 'insert'
        query += Math.random().toString(36).substr(2, 5)              
        //let hash: Hash = new Crc32(query)
        let hash: Hash = new SqlId(query)                
        let isHashFound = sharedPool.findHash(hash)
                
        // caso o hash nao seja encontrado, adicione na shared-pool 
        if(!isHashFound)
            sharedPool.addHash(hash)               

        new AnimationInsert(isHashFound).start()
    }
}