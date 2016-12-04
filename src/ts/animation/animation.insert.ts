import { Hash } from '../crypt/hash'
import { Animation } from './animation'
import { ServerProcess } from '../process/server.process'
import { ServerProcessInsert } from '../process/server.process.insert'
import { UserProcess } from '../process/user.process'
import { SharedPool } from '../oracle-instance/shared.pool'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { DataBlock } from '../oracle-database/data.block'

/**
 * AnimationInsert
 * Classe responsavel por implementar animações relacionadas ao insert  
 */
export class AnimationInsert extends Animation{    
    private animationTime: number
    private hash: Hash

    constructor(hash: Hash){
        super()
        this.animationTime = super.getDelay() * 5
        this.hash = hash
    }

    /**
     * start
     * Inicio da animacao do insert
     */
    async start(){
        // setando estado de inicio da animacao
        Orasim.getAnimation().setAnimating(true)
        let userProcess: UserProcess = Orasim.getUserProcess()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        // let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        // let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
      
        userProcess.animateSendDataToServerProcess(this.animationTime, "INSERT")
        .then((result: number) => { 
            // return new Promise <number> ((resolve: Function, reject: Function) => {               
                return new ServerProcessInsert().animateInsert(this.hash)        
            // })
         })
         .then((result: void) => {
             console.log("insert animating = false")
             return Orasim.getAnimation().setAnimating(false)
         })

        // .then((result: number) => {
        // })
    }
}