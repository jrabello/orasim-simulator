import { Hash } from '../crypt/hash'
import { Delay } from '../time/delay'
import { Animation } from './animation'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'
import { SqlConsoleMsgWarning } from '../sql-console/sql.console.msg.warning'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
import { ServerProcessInsert } from '../process/server.process.insert'

/**
 * AnimationUpdate
 * Classe responsavel por implementar animações relacionadas ao update
 * @attribute {isHashFound} Caso o hash seja encontrado na shared-pool este atributo é marcado como true, caso contrário, false
 * @attribute {animHashNotFoundDelay} Delay da animacao do hash nao encontrado na shared-pool
 * @attribute {animHashFoundDelay} Delay da animacao hash encontrado
 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para  
 */
export class AnimationUpdate extends Animation{
    private hash: Hash
    private isHashFound: boolean

    constructor(hash: Hash){
        super()
        this.hash = hash
        //this.isHashFound = isHashFound
        //this.buildAnimUpdate(isHashFound)       
    }

    /**
     * start
     * Inicio da animacao do update
     * 
     */
    async start(){
        //copia do insert        
        Orasim.getAnimation().setAnimating(true)
        let userProcess: UserProcess = Orasim.getUserProcess()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
                
        //animacao do relogio
        await userProcess.animateSendDataToServerProcessAsync(5000, "UPDATE")
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< SP > Realizando parse...'))
        $("#server-process").addClass("time-clock")
        await new Delay(5000).sleep()

        //animacao hash nao encontrado no dbBufferCache
        await serverProcess.animateHashNotFound(this.hash)
        //resto da animacao de insert             
        await new ServerProcessInsert().animateInsert(this.hash)        

        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< SP > Retornando o controle para o UserProcess`))
        await new Delay(3000).sleep()
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))
        Orasim.getAnimation().setAnimating(false)       
        
        // let userProcess: UserProcess = Orasim.getUserProcess()        
        // let serverProcess: ServerProcess = Orasim.getServerProcess()                
        // // setando estado de inicio da animacao
        // // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
        // // setando estado de termino da animacao
        // Orasim.getAnimation().setAnimating(true)        
        // await userProcess.animateSendDataToServerProcessAsync(5000, "UPDATE")
        // await serverProcess.animateGetBlocksFromDataFiles(this.hash, this.isHashFound)
        // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< SP > Retornando o controle para o UserProcess`))
        // await new Delay(3000).sleep()
        // Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))                    
        // Orasim.getAnimation().setAnimating(false)         
    }
}