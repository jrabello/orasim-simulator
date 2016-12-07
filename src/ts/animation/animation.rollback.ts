import { UserProcess } from '../process/user.process'
import { Animation } from './animation'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { Lgwr } from '../oracle-instance/lgwr'
import { DataBlock } from '../oracle-database/data.block'
import { Delay } from '../time/delay'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { SqlConsoleMsgWarning } from '../sql-console/sql.console.msg.warning'
import { ServerProcess } from '../process/server.process'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'


export class AnimationRollback extends Animation {
    constructor(){
        super()
    }

    async start() {                
        let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()
        let userProcess: UserProcess = Orasim.getUserProcess()        
        let lgwr: Lgwr = Orasim.getOracleInstance().getLgwr()
        Orasim.getAnimation().setAnimating(true)

        //enviando rollback
        await userProcess.animateSendDataToServerProcessAsync(5000, "ROLLBACK")        
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Descartando as alterações realizadas"))        
        await new Delay(3000).sleep()
        
        //desbloqueando locked blocks
        let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Desbloqueando os registros que seriam alterados'))
        await new Delay(3000).sleep()
        await super.animBlinkTwoElements('#server-process','#db-buffer-cache', 5000)
        let blockIndexesLocked = dbBufferCache.getBlockIndexes("block-locked")        
        dbBufferCache.freeMemoryAttribute("block-locked")

        // < SP > Liberando os blocos para nova escrita (se der usar nesse caso um "L" de bloco de livre 
        // e deixar branco a cor)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Liberando os blocos para nova escrita'))
        await new Delay(3000).sleep()
        await super.animBlinkTwoElements('#server-process','#db-buffer-cache', 5000)
        let blocksOldColorArr: string[] = new Array<string>()
        let allBLocks = dbBufferCache.getBlocks()
        //salvando as cores antigas e deixando blocos atuais brancos
        for (let i = 0; i < blockIndexesLocked.length; i++){            
            blocksOldColorArr.push(allBLocks[blockIndexesLocked[i]].getColor())
            allBLocks[blockIndexesLocked[i]].setColor('#ffffff')
            await new Delay(300).sleep()
        }

        // < SP > Voltando registros da área de UNDO para o DB_BufferCache 
        // (piscar bloco de UNDO e depois apagar deixando só o bloco)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Liberando registros da área de UNDO para o DB_BufferCache'))
        await new Delay(3000).sleep()
        await super.animBlinkTwoElements('#server-process','#db-buffer-cache', 5000)
        let blockUndoIndexes = dbBufferCache.getBlockIndexes("block-undo")
        
        //apagando blocks de undo
        for (let i = 0; i < blockUndoIndexes.length; i++){            
            allBLocks[blockUndoIndexes[i]].setColor('#ffffff')
            allBLocks[blockUndoIndexes[i]].setUsed(false)
            $(allBLocks[blockUndoIndexes[i]].getElement()).removeClass("block-undo")                        
            await new Delay(300).sleep()
        }
        //restaurando as cores antigas dos dataBlocks
        for (let i = 0; i < blockIndexesLocked.length; i++){            
            //blocksOldColorArr.push(allBLocks[blockIndexesLocked[i]].getColor())
            allBLocks[blockIndexesLocked[i]].setColor(blocksOldColorArr[i])
            await new Delay(300).sleep()
        }

        // < SP > Retornando o controle para UserProcess
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Retornando o controle para UserProcess'))
        await new Delay(3000).sleep()
        // < UP > Aguardando solicitação...
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning('< UP > Aguardando solicitação...'))
        await new Delay(3000).sleep()

        //return
        // //pegando dirty blocks from redoLogBuffer
        // let blocks = lgwr.getDirtyBlocksFromRedoLogBuffer()

        // //enviando blocks para redo.log.files
        // await lgwr.sendBlocksToRedoLogFiles(blocks)
        
        // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Commit realizado com sucesso!" ))
        // await new Delay(3000).sleep()
        // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Transação gravada em disco." ))
        // await new Delay(3000).sleep()

        // //call server process unlock
        // let serverProcess: ServerProcess = Orasim.getServerProcess()
        // await serverProcess.unlockBlocks()

        // //enviando dados para user process                
        // await serverProcess.animSendDataToUserProcess(6000)

        // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))
        // Orasim.getAnimation().setAnimating(false)
        //await super.animBlinkTwoElements('#lgwr','#redo-log-buffer', 5000)
    }
}