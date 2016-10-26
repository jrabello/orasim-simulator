import { SqlConsole } from './sql-console/sql.console'
import { SqlButton } from './sql-button/sql.button'
import { ServerProcess } from './process/server.process'
import { UserProcess } from './process/user.process'
import { Animation } from './animation/animation'
import { OracleDatabase } from './oracle-database/oracle.database'
import { OracleInstance } from './oracle-instance/oracle.instance'

/** 
 * Main
 * Classe Responsável por guardar instâncias de todos os metodos 
 * que possuem caracteristica de SingleTon(uma unica e apenas uma instancia) 
 */
class Main {
    private sqlConsole: SqlConsole
    private sqlButton: SqlButton
    private animation: Animation
    private oracleInstance: OracleInstance
    private oracleDatabase: OracleDatabase
    private serverProcess: ServerProcess
    private userProcess: UserProcess
    
    // criando instancias de classes SingleTon 
    constructor() {
        this.sqlConsole = new SqlConsole()
        this.sqlButton = new SqlButton()
        this.serverProcess = new ServerProcess()
        this.userProcess = new UserProcess()
        this.animation = new Animation()
        this.oracleInstance = new OracleInstance()
        this.oracleDatabase = new OracleDatabase()
    }

    getSqlButton(): SqlButton{
        return this.sqlButton
    }

    getUserProcess(): UserProcess {
        return this.userProcess
    }

    getServerProcess(): ServerProcess {
        return this.serverProcess
    }

    getSqlConsole(): SqlConsole {
        return this.sqlConsole
    }

    public getAnimation(): Animation {
        return this.animation
    }

    public getOracleInstance(): OracleInstance {
        return this.oracleInstance
    }

    public getOracleDatabase(): OracleDatabase {
        return this.oracleDatabase
    }
}

// adicionando instancia da classe Main dentro de objeto global 
// chamado Orasim(global namespace)
(<any>window).Orasim = new Main()
