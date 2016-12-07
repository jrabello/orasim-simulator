import { DataFiles } from './data.files'
import { RedoLogFiles } from './redo.log.files'

export class OracleDatabase{
    private dataFiles: DataFiles
    private redoLogFiles: RedoLogFiles

    constructor(){
        this.dataFiles = new DataFiles()
        this.redoLogFiles = new RedoLogFiles()
    }

    //let dataFiles: DataFiles = Orasim.getOracleDatabase().getDataFiles()
    getDataFiles(): DataFiles{
        return this.dataFiles
    }

    getRedoLogFiles(): RedoLogFiles{
        return this.redoLogFiles
    }
}