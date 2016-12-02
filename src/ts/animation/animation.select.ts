import { Hash } from '../crypt/hash'
import { Animation } from './animation'
import { ServerProcess } from '../process/server.process'
import { UserProcess } from '../process/user.process'

/**
 * AnimationSelect
 * Classe responsavel por implementar animações relacionadas ao select
 * @attribute {isHashFound} Caso o hash seja encontrado na shared-pool este atributo é marcado como true, caso contrário, false
 * @attribute {animHashNotFoundDelay} Delay da animacao do hash nao encontrado na shared-pool
 * @attribute {animHashFoundDelay} Delay da animacao hash encontrado
 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para  
 */
export class AnimationSelect extends Animation{
    // private isHashFound: boolean
    // private animHashDelay: number
    // private animUserProcessDelay: number
    private animationTime: number
    private hash: Hash
    private hashFound: boolean

    constructor(hash: Hash, hashFound: boolean){
        super()
        this.animationTime = super.getDelay() * 15
        this.hash = hash
        this.hashFound = hashFound
    }

    /**
     * buildAnimSelect
     * inicializando elementos da classe
     * @param {isHashFound} argumento passado pelo parser sinalizando se o hash foi encontrado na shared pool ou não
     */
    //buildAnimSelect(isHashFound: boolean): void{
        // this.isHashFound =  isHashFound
        // this.animUserProcessDelay = super.getDelay() * 2
        // this.animHashDelay = super.getDelay() * 10
    //}

    /**
     * start
     * Inicio da animacao do select
     */
    start(): void{
        // setando estado de inicio da animacao
        let userProcess: UserProcess = Orasim.getUserProcess()
        let serverProcess: ServerProcess = Orasim.getServerProcess()
        Orasim.getAnimation().setAnimating(true)
        
        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
        // setando estado de termino da animacao        
        userProcess.animateSendDataToServerProcess(this.animationTime * 0.20, "SELECT")
        .then((result: number) => {
            return serverProcess.animateByHash(this.hash, this.hashFound, this.animationTime * 0.80)
        })
        .then((result: number) => {            
            return Orasim.getAnimation().setAnimating(false)            
        })
    }
}