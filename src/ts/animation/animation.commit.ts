import { UserProcess } from '../process/user.process'
import { Animation } from './animation'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { Lgwr } from '../oracle-instance/lgwr'
import { DataBlock } from '../oracle-database/data.block'

export class AnimationCommit extends Animation{
    private animationTime: number

    constructor(){
        super()
        this.animationTime = super.getDelay() * 5 
    }    

    start(): void{      
        
        let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()
        let lgwr: Lgwr = Orasim.getOracleInstance().getLgwr()        
        let blocks: DataBlock[] = new Array<DataBlock>()

        //counting number of blocks used
        //apagando status dos blocks do redo-log-buffer
        //criando numero de blocks do numRedoBlocksUsed dentro de redo-log-buffer
        for (let index in redoLogBuffer.getBlocks()){
            let block = redoLogBuffer.getBlocks()[index]
            if(block.used()){       
                //criando novo bloco que sera usado na animacao de envio para o log writer         
                let newBlock =  redoLogBuffer.createNewDataBlock()
                newBlock.setColor(block.getColor())
                blocks.push(newBlock)
                //resetando o estado dos blocos do redo log buffer
                block.setUsed(false)
                block.setColor("#ffffff")                
            }
        }

        //implementando animacao
        let userProcess: UserProcess = Orasim.getUserProcess()
        userProcess.animateSendDataToServerProcess(this.animationTime*0.25, "COMMIT")
        .then((result: number) => { 
            return new Promise <number> ((resolve: Function, reject: Function) => {
                let localAnimTime = this.animationTime*0.75
                //anima-los para log-writer
                lgwr.animGetBlocksFromRedoLogBuffer(blocks, localAnimTime*0.50)
                //uma vez no log-writer precisamos envia-los ao redo-log-files
                lgwr.animSendBlocksToRedoLogFiles(blocks, localAnimTime*0.50)
                setTimeout(() => {resolve(0)}, localAnimTime)
            })
         })
         .then((result: number) => {
             return Orasim.getAnimation().setAnimating(false)
         })
    }

    
}