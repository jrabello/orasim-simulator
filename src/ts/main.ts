import { SqlConsole } from './sql.console'
import { Animation } from './animation'
import { OracleDatabase } from './oracle-database/oracle.database'
import { OracleInstance } from './oracle-instance/oracle.instance'

class Main{
    private sqlConsole: SqlConsole
    private animation: Animation
    private oracleInstance: OracleInstance
    private oracleDatabase: OracleDatabase
    
    constructor(){
        this.sqlConsole = new SqlConsole()
        this.animation = new Animation()
        this.oracleInstance = new OracleInstance()
        this.oracleDatabase = new OracleDatabase()
    }

    public getSqlConsole(): SqlConsole{
        return this.sqlConsole
    }

    public getAnimation(): Animation{
        return this.animation
    }

    public getOracleInstance(): OracleInstance{
        return this.oracleInstance
    }

    public getOracleDatabase(): OracleDatabase{
        return this.oracleDatabase
    }
}

//storing main instance into global namespace
window.Orasim = new Main()
