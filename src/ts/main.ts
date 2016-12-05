import { SqlConsole } from './sql-console/sql.console'
import { SqlButtons } from './sql-buttons/sql.buttons'
import { ServerProcess } from './process/server.process'
import { UserProcess } from './process/user.process'
import { ListenerProcess } from './process/listener.process'
import { Animation } from './animation/animation'
import { OracleDatabase } from './oracle-database/oracle.database'
import { OracleInstance } from './oracle-instance/oracle.instance'
import {Delay} from './time/delay'

/** 
 * Main
 * Classe Responsável por guardar instâncias de todos os metodos 
 * que possuem caracteristica de SingleTon(uma unica e apenas uma instancia) 
 */
class Main {
    private sqlConsole: SqlConsole
    private sqlButtons: SqlButtons
    private animation: Animation
    private oracleInstance: OracleInstance
    private oracleDatabase: OracleDatabase
    private serverProcess: ServerProcess
    private userProcess: UserProcess
    private listenerProcess: ListenerProcess
    
    // criando instancias de classes SingleTon 
    constructor() {
        this.sqlConsole = new SqlConsole()
        this.sqlButtons = new SqlButtons()
        this.serverProcess = new ServerProcess()
        this.userProcess = new UserProcess()
        this.listenerProcess = new ListenerProcess()
        this.animation = new Animation()
        this.oracleInstance = new OracleInstance()
        this.oracleDatabase = new OracleDatabase()
        //this.someDelay()    
    }

    async someDelay(){
        console.log('lol')
        await new Delay(5000).sleep();
        for (let i = 0; i < 3; i++) {            
            console.log(".");
            await new Delay(1000).sleep();
        }
        console.log('lal')
    }

    getSqlButtons(): SqlButtons{
        return this.sqlButtons
    }

    getUserProcess(): UserProcess {
        return this.userProcess
    }

    getServerProcess(): ServerProcess {
        return this.serverProcess
    }

    getListenerProcess(): ListenerProcess {
        return this.listenerProcess
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
