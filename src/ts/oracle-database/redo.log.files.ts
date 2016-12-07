import { Delay } from '../time/delay'
import { DataBlock } from '../oracle-database/data.block'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'

export class RedoLogFiles{
    private LOG1_A: string
    private LOG2_A: string 
    private LOG1_B: string
    private LOG2_B: string        
    private group1: number
    private group2: number    
    private discoA: string[]
    private discoB: string[]
    private selectorIndex: number
    private numBlocksInserted: number
    private incrementer: number

    constructor(){
        this.LOG1_A =  "LOG1_A"
        this.LOG2_A =  "LOG2_A"
        this.LOG1_B =  "LOG1_B"
        this.LOG2_B =  "LOG2_B"
        this.discoA = new Array<string>()
        this.discoA.push(this.LOG1_A)
        this.discoA.push(this.LOG2_A)
        this.discoB = new Array<string>()
        this.discoB.push(this.LOG1_B)
        this.discoB.push(this.LOG2_B)        
        this.group1 = 0
        this.group2 = 1
        this.selectorIndex = 0
        this.numBlocksInserted = 0
        this.incrementer = 1

        // $('#'+this.discoA[this.group1]).addClass("redo-log-file-green")
        // $('#'+this.discoB[this.group1]).addClass("redo-log-file-green")
        // $('#'+this.discoA[this.group2]).addClass("redo-log-file-red")
        // $('#'+this.discoB[this.group2]).addClass("redo-log-file-red")
    }

    async showCurrentLogGroup(){
        this.changeGroupsColor()
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< LGWR > REDO Grupo ${this.selectorIndex+1 } arquivos: ${this.discoA[this.selectorIndex]} e ${this.discoB[this.selectorIndex]} `))
        await new Delay(3000).sleep()
        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< LGWR > REDO Grupo ${ this.selectorIndex+1 } status..: EM USO`))        
        await new Delay(3000).sleep()
    }

    changeGroupsColor(){ 
        if(this.selectorIndex == this.group1) {      
            $('#'+this.discoA[this.group1]).attr('class',"log redo-log-file-green")
            $('#'+this.discoB[this.group1]).attr('class',"log redo-log-file-green")
            $('#'+this.discoA[this.group2]).attr('class',"log redo-log-file-red")
            $('#'+this.discoB[this.group2]).attr('class',"log redo-log-file-red")
        }else{
            //grupo 2 escolhido
            $('#'+this.discoA[this.group1]).attr('class',"log redo-log-file-red")
            $('#'+this.discoB[this.group1]).attr('class',"log redo-log-file-red")
            $('#'+this.discoA[this.group2]).attr('class',"log redo-log-file-green")
            $('#'+this.discoB[this.group2]).attr('class',"log redo-log-file-green")            
        }   
    }

    async storeData(blocks: DataBlock[]){
        let sizeBlocks = blocks.length
        this.numBlocksInserted += sizeBlocks
        if(this.numBlocksInserted >= 3){
            this.numBlocksInserted = 0
            let selectorPlusOne = this.selectorIndex+1
            //6 RedoBLocks arrived!
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< ARCH > Iniciando geração de archive'))        
            await new Delay(3000).sleep()
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
                `< ARCH > REDO Grupo ${selectorPlusOne} status..: EM CÓPIA`))        
            await new Delay(3000).sleep()
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
                `< ARCH > Copiando o Redo Log File: Grupo ${selectorPlusOne}`))        
            await new Delay(3000).sleep()            
            
            //animacao salvando archive
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
                `< ARCH > Salvando como Archived Log File: ARC_0${++this.incrementer}`))        
            await new Delay(3000).sleep()
            Orasim.getAnimation().animBlinkTwoElements("#arcn", "#oracle-log-container", 5000)                                
            await new Delay(3000).sleep()            
            $("#arc0"+this.incrementer).removeClass("hiddenArc")            
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
                `< ARCH > Archive ARC_0${this.incrementer} salvo com sucesso!`))
            await new Delay(3000).sleep()            
            
            //swithing to another group
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
                `< LGWR > REDO Grupo ${selectorPlusOne} status..: LIBERADO`))        
            await new Delay(3000).sleep()            
            this.selectorIndex ^= 1
            this.changeGroupsColor()
            selectorPlusOne = this.selectorIndex+1

            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(
                `< LGWR > REDO Grupo ${selectorPlusOne} arquivos: ${this.discoA[this.selectorIndex]} e ${this.discoB[this.selectorIndex]} `))
            await new Delay(3000).sleep()
            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< LGWR > REDO Grupo ${selectorPlusOne} status..: EM USO`))        
            await new Delay(3000).sleep()

            Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo(`< ARCH > Liberando o Redo Log File: Grupo ${(this.selectorIndex ^ 1)+1} `))
            await new Delay(3000).sleep()
        }
    }
}