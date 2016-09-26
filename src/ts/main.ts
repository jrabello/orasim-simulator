import { SqlConsole } from './sql.console'
import { Animation } from './animation'

class Main{
    private sqlConsole: SqlConsole
    private animation: Animation
    //lol
    constructor(){
        this.sqlConsole = new SqlConsole()
        this.animation = new Animation()
    }

    public getSqlConsole(): SqlConsole{
        return this.sqlConsole
    }

    public getAnimation(): Animation{
        return this.animation
    }
}

//storing main instance into global namespace
window.Orasim = new Main()
