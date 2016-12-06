import { Hash } from '../crypt/hash'
import {SqlQueryData} from './sql.query.data'

export class SqlDataContainer{
    private sqlQueryDataMap: std.HashMap<number, SqlQueryData>

    constructor(){
        this.sqlQueryDataMap = new std.HashMap<number, SqlQueryData>()
    }

    add( queryName: string, hash: Hash): void{
        if(this.sqlQueryDataMap.has(hash.getHash()))
            return
        this.sqlQueryDataMap.insert([hash.getHash(), new SqlQueryData(queryName, hash)]) 
    }
} 