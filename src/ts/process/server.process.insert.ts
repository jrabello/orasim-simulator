import { Hash } from '../crypt/hash'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'
import { SharedPool } from '../oracle-instance/shared.pool'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'

export class ServerProcessInsert extends ServerProcess{
    
    constructor(){
        super()        
    }

    async animateInsert(hash: Hash){
        // let userProcess: UserProcess = Orasim.getUserProcess()
        // let serverProcess: ServerProcess = Orasim.getServerProcess()
        // let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()

        //adicionando hash na shared pool
        //pegando array de blocks da shared pool que correspondem ao hash
        sharedPool.animateAddHash(hash)    
        let memLocationArr = sharedPool.getMemoryLocation(hash)

        //escrevendo no db-buffer-cache
        await super.animateSendBlockTo('#db-buffer-cache', hash, 2000)
        //escrevendo no redo-log-files        
        await super.animateSendBlockTo('#redo-log-buffer', hash, 2000)
        
    }
}