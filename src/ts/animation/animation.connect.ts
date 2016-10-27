import { Animation } from './animation'
import { UserProcess } from '../process/user.process'

/**
 * AnimationConnect
 * Classe responsavel por implementar animações relacionadas ao comando connect
 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para  
 */
export class AnimationConnect extends Animation{
    private animUserProcessDelay: number

    constructor(){
        super()
        this.animUserProcessDelay = super.getDelay() * 10
    }

    /**
     * start
     * Inicio da animacao connect
     */
    start(): void{        
        // setando estado de inicio da animacao
        let userProcess: UserProcess = Orasim.getUserProcess()
        Orasim.getAnimation().setAnimating(true)
        
        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
        // setando estado de termino da animacao        
        userProcess.animateSendDataToListener(this.animUserProcessDelay)
        .then((res) => {
            return Orasim.getAnimation().setAnimating(false)                              
            // return this.animateSelect()
        })
        .then((res) => {            
            return Orasim.getAnimation().setAnimating(false)            
        })
    }

}