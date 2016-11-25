import { DataFiles } from './data.files'

export class OracleDatabase{
    private dataFiles: DataFiles

    constructor(){
        this.dataFiles = new DataFiles()
    }

    getDataFiles(): DataFiles{
        return this.dataFiles
    }
}