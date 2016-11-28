import { Animation } from './animation'
import { ServerProcess } from '../process/server.process'
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

    constructor(isHashFound: boolean){
        super()
        this.animationTime = super.getDelay() * 5
    }

    /**
     * start
     * Inicio da animacao do insert
     */
    start(): void{
        // setando estado de inicio da animacao
        Orasim.getAnimation().setAnimating(true)
        let userProcess: UserProcess = Orasim.getUserProcess()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
      

        userProcess.animateSendDataToServerProcess(this.animationTime*0.25, "INSERT")
        .then((result: number) => { 
            return new Promise <number> ((resolve: Function, reject: Function) => {               
                //pegando dados da shared pool
                let localAnimTime = this.animationTime*0.75
                sharedPool.animateAddHash() // animacao adicionando hash na shared pool
                let lastAddedHash = sharedPool.getLastHash() // pegando ultimo hash adicionado                
                let memLocation = sharedPool.getLastMemoryLocation() // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache
                
                //ambos tem a mesma porcentagem de tempo para animar porque a animacao eh feita ao mesmo tempo
                serverProcess.animateSendBlockTo('#redo-log-buffer', lastAddedHash, localAnimTime);
                serverProcess.animateSendBlockTo('#db-buffer-cache', lastAddedHash, localAnimTime);
                setTimeout(() => {resolve(0)}, localAnimTime)
                //serverProcess.animateSendBlockTo()
            })
         })
         .then((result: number) => {
             return Orasim.getAnimation().setAnimating(false)
         })

        // .then((result: number) => {
        // })
    }
}