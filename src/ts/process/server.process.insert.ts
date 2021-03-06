import { Random } from '../crypt/rand'
import { Hash } from '../crypt/hash'
import { Delay } from '../time/delay'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'
import { SharedPool } from '../oracle-instance/shared.pool'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'


export class ServerProcessInsert extends ServerProcess {

    constructor() {
        super()
    }

    async animateInsert(hash: Hash) {

        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()

        //lockando blocos sujos
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< SP > Bloqueando registros nos "blocos sujos"`))
        await new Delay(3000).sleep()
        await Orasim.getAnimation().animBlinkTwoElements('#server-process','#db-buffer-cache', 5000)
        dbBufferCache.setMemoryAttribute(hash,"block-locked")

        //duplicando entradas no dbBufferCache(UNDO)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Copiando blocos atuais e salvando na área de <span style='font-weight: bold'>UNDO</span>"))
        await new Delay(3000).sleep()
        await Orasim.getAnimation().animBlinkTwoElements('#server-process','#db-buffer-cache', 5000)
        let randomMem = dbBufferCache.duplicateAllocRandomMemory(hash)        
        dbBufferCache.setMemoryAttributeByArray(randomMem, "block-undo")

        //escrevendo no redo-log-files
        //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Carregando dados no <span style='font-weight: bold'>Redo Log Buffer</span>"))
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Salvando informações da transação na área de <span style='font-weight: bold'>REDO</span>"))
        await new Delay(3000).sleep()
        await Orasim.getAnimation().animBlinkTwoElements('#server-process', '#redo-log-buffer', 5000)
        await super.animStoreRedoBlocksInRedoLogBuffer(hash, 10000)        
        //await super.animateSendBlockTo('#redo-log-buffer', hash, 5000)        
    }


    // let userProcess: UserProcess = Orasim.getUserProcess()
    // let serverProcess: ServerProcess = Orasim.getServerProcess()
    // let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
    // //animacao do relogio no server process, realizando parsing
    // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Realizando parse...'))
    // $("#server-process").addClass("time-clock")
    // await new Delay(5000).sleep()        
    // //animacao adicionando hash na shared pool
    // //pegando array de blocks da shared pool que correspondem ao hash        
    // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
    // `< SP > <span style='font-weight: bold; color: red;'>HARD Parse</span>
    // concluído, gerado 
    // <span style="font-weight: bold">SQL_ID</span>: 
    // <span style="font-weight: bold; color: ${hash.getColor()}">${hash.getHashStr()}</span>, adicionando na <span style="font-weight: bold">SharedPool</span>`))
    // $("#server-process").removeClass("time-clock")        
    // await super.animSearchSharedPool(5000)        
    // sharedPool.animateAddHash(hash)
    // //let memLocationArr = sharedPool.getMemoryLocation(hash)
    // await new Delay(3000).sleep()
    // //escrevendo no dbBufferCache
    // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo("< SP > Carregando dados no <span style='font-weight: bold'>DB_BufferCache</span>"))
    // await new Delay(3000).sleep()
    // await Orasim.getAnimation().animBlinkTwoElements('#server-process','#db-buffer-cache', 5000)                
    // //await super.animateSendBlockTo('#db-buffer-cache', hash, 5000)
    // await super.animStoreBlocksInDbBufferCache(hash, 5000)        
    // await new Delay(3000).sleep()
}