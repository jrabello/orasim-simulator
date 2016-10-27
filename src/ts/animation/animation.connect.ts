import { Animation } from './animation'
import { UserProcess } from '../process/user.process'
import { ListenerProcess } from '../process/listener.process'
import { SqlButtons } from '../sql-buttons/sql.buttons'

/**
 * AnimationConnect
 * Classe responsavel por implementar animações relacionadas ao comando connect
 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para  
 */
export class AnimationConnect extends Animation{
    private animUserProcessDelay: number
    private animListenerProcessDelay: number

    constructor(){
        super()
        this.animUserProcessDelay = super.getDelay() * 10
        this.animListenerProcessDelay = super.getDelay() * 10
    }

    /**
     * start
     * Inicio da animacao connect
     */
    start(): void{        
        let userProcess: UserProcess = Orasim.getUserProcess()
        let listenerProcess: ListenerProcess = Orasim.getListenerProcess()
        let sqlButtons: SqlButtons = Orasim.getSqlButtons()

        // setando estado de inicio da animacao
        Orasim.getAnimation().setAnimating(true)
        
        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
        // setando estado de termino da animacao        
        userProcess.animateSendDataToListener(this.animUserProcessDelay)
        .then((res) => {
            return listenerProcess.animateSendDataToServer(this.animListenerProcessDelay)
        })
        .then((res) => {            
            return listenerProcess.animateConnectToServer(this.animUserProcessDelay)            
        })
        .then((res) => {            
            return sqlButtons.undisplayConnectDisplayCommandButtons()            
        })
        .then((res) => {            
            return Orasim.getAnimation().setAnimating(false)            
        })
    }
}