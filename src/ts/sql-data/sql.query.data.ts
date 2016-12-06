import { Hash } from '../crypt/hash'
import { DataBlock } from '../oracle-database/data.block'
import { DataBlockRedo } from '../oracle-database/data.block.redo'

export class SqlQueryData{
    private hash: Hash
    private queryId: string //ex insert    
    private isTransaction: boolean
    private needs2Commit: boolean
    //private numBlocks: number //numero de blocks associados a essa query
        
    constructor(queryId: string, hash: Hash){
        this.queryId = queryId
        this.hash = hash 
        //this.numBlocks = numBlocks 

        if(queryId != 'select'){
            this.isTransaction = true
            this.needs2Commit = true    
        }else{
            //not select, insert, update, or delete
            this.isTransaction = false
            this.needs2Commit = false
        }
    }
}