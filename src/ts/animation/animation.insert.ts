import { Delay } from '../time/delay'
import { Hash } from '../crypt/hash'
import { Animation } from './animation'
import { ServerProcess } from '../process/server.process'
import { ServerProcessInsert } from '../process/server.process.insert'
import { UserProcess } from '../process/user.process'
import { SharedPool } from '../oracle-instance/shared.pool'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { DataBlock } from '../oracle-database/data.block'
import { SqlConsoleMsgWarning } from '../sql-console/sql.console.msg.warning'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'

/**
 * AnimationInsert
 * Classe responsavel por implementar animações relacionadas ao insert  
 */
export class AnimationInsert extends Animation{    
    private animationTime: number
    private isHashFound: boolean
    private hash: Hash

    constructor(hash: Hash, isHashFound: boolean){
        super()        
        this.hash = hash
        this.animationTime = super.getDelay() * 5
        this.isHashFound = isHashFound
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
        
        await userProcess.animateSendDataToServerProcessAsync(5000, "INSERT")
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Realizando parse...'))
        $("#server-process").addClass("time-clock")
        await new Delay(5000).sleep()        
        await serverProcess.animateHashNotFound(this.hash)             
        await new ServerProcessInsert().animateInsert(this.hash)        

        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))        
        Orasim.getAnimation().setAnimating(false)       
        
        // .then((result: number) => {
        // })
    }
}