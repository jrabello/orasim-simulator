import { UserProcess } from '../process/user.process'
import { Animation } from './animation'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { Lgwr } from '../oracle-instance/lgwr'
import { DataBlock } from '../oracle-database/data.block'
import { Delay } from '../time/delay'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { SqlConsoleMsgWarning } from '../sql-console/sql.console.msg.warning'

export class AnimationCommit extends Animation {
    private animationTime: number

    constructor() {
        super()
        this.animationTime = super.getDelay() * 5
    }

    async start() {                
        let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()
        let userProcess: UserProcess = Orasim.getUserProcess()        
        let lgwr: Lgwr = Orasim.getOracleInstance().getLgwr()
        Orasim.getAnimation().setAnimating(true)

        //enviando commit
        await userProcess.animateSendDataToServerProcessAsync(5000, "COMMIT")        
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< LGWR > Gravando alterações em disco"))        
        await new Delay(3000).sleep()
        await super.animBlinkTwoElements('#lgwr','#redo-log-buffer', 5000)
 
        //pegando dirty blocks from redoLogBuffer
        let blocks = lgwr.getDirtyBlocksFromRedoLogBuffer()

        //enviando blocks para redo.log.files
        await lgwr.sendBlocksToRedoLogFiles(blocks)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< SP > Commit realizado com sucesso! Transação gravada em disco." ))
        await new Delay(3000).sleep()
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))
        Orasim.getAnimation().setAnimating(false)
    }
}