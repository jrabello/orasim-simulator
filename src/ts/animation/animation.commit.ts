import { UserProcess } from '../process/user.process'
import { Animation } from './animation'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { Lgwr } from '../oracle-instance/lgwr'
import { DataBlock } from '../oracle-database/data.block'

export class AnimationCommit extends Animation {
    private animationTime: number

    constructor() {
        super()
        this.animationTime = super.getDelay() * 5
    }

    async start() {                
        let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()        
        let lgwr: Lgwr = Orasim.getOracleInstance().getLgwr()
        Orasim.getAnimation().setAnimating(true)

        //pegando dirty blocks from redoLogBuffer
        let blocks = lgwr.getDirtyBlocksFromRedoLogBuffer()
        //enviando blocks para redo.log.files
        await lgwr.sendBlocksToRedoLogFiles(blocks)
        Orasim.getAnimation().setAnimating(false)
    }

}