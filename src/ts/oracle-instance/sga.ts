import { DbBufferCache } from './db.buffer.cache'
import { SharedPool } from './shared.pool' 

export class Sga{
    private dbBufferCache: DbBufferCache
    private sharedPool: SharedPool

    constructor(){
        this.dbBufferCache = new DbBufferCache()
        this.sharedPool = new SharedPool()
    }

    getSharedPool(){
        return this.sharedPool
    }

    getDbBufferCache(){
        return this.dbBufferCache
    }
}