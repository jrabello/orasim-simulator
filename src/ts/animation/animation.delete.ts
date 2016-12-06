import { Hash } from '../crypt/hash'
import { Animation } from './animation'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'
import { SqlConsoleMsgWarning } from '../sql-console/sql.console.msg.warning'

/**
 * AnimationUpdate
 * Classe responsavel por implementar animações relacionadas ao update
 * @attribute {isHashFound} Caso o hash seja encontrado na shared-pool este atributo é marcado como true, caso contrário, false
 * @attribute {animHashNotFoundDelay} Delay da animacao do hash nao encontrado na shared-pool
 * @attribute {animHashFoundDelay} Delay da animacao hash encontrado
 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para  
 */
export class AnimationDelete extends Animation{
    private hash: Hash
    private isHashFound: boolean

    constructor(hash: Hash, isHashFound: boolean){
        super()
        this.hash = hash
        //this.buildAnimUpdate(isHashFound)       
    }

    /**
     * start
     * Inicio da animacao do update
     */
    async start(){        
        let userProcess: UserProcess = Orasim.getUserProcess()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
                
        // setando estado de inicio da animacao
        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
        // setando estado de termino da animacao
        Orasim.getAnimation().setAnimating(true)        
        await userProcess.animateSendDataToServerProcessAsync(5000, "DELETE")
        await serverProcess.animateByHash(this.hash, this.isHashFound)
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgWarning("< UP > Aguardando solicitação..."))                    
        Orasim.getAnimation().setAnimating(false)                    
    }
}