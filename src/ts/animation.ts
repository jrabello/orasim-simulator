import { SqlParser } from './sql.parser'
import { Crc32 } from './crypt/crc32'
import { Hash } from './crypt/hash'
import { DbBufferCache } from './oracle-instance/db.buffer.cache'
import { SharedPool } from './oracle-instance/shared.pool'
import { SqlConsole } from './sql.console'
import { SqlConsoleMessage } from './sql.console.message'

export class Animation {
    private delay: number

    constructor() {
        //miliseconds
        this.delay = 1000

        // TAKEN
        // taken from http://stackoverflow.com/questions/10370298/how-do-i-animate-in-jquery-without-stacking-callbacks
        //overriding jquery object
        //this chain method makes sure animations are executed 
        //in order using promises
        // $.chain = function () {
        //     let promise = $.Deferred().resolve().promise();
        //     jQuery.each(arguments, function () {
        //         promise = promise.pipe(this);
        //     });
        //     return promise;
        // };
    }

    start(sqlParser: SqlParser) {
        //if here query was parsed successfully       
        if (sqlParser.getQueryTokenId() == "SELECT") {
            this.selectAnimation(sqlParser)
        }
    }

    private selectAnimation(sqlParser: SqlParser): void {
        let query = sqlParser.getQuery()
        let hash = new Crc32(query)

        // let retSend2ServerProc =  
        // console.log('selectAnimation retSend2ServerProc:', retSend2ServerProc)
        // let retServerProcessDoSelect =  
        // console.log('selectAnimation retAnimateBlock:', retServerProcessDoSelect)
        // executing one group of animations after another
        // new Promise(() => {
        //     return 
        // }).then((res) => {                                              
        // })
        // new Promise(() => {                    
        //     return this.sendDataFromUserProcessToServerProcess();
        // })
        // .then((res) => {            
        //     return this.serverProcessDoSelect(hash)
        // });
        // $.chain(() => {
        //     return this.sendDataFromUserProcessToServerProcess()
        // }, () => {
        //     return this.serverProcessDoSelect(hash)
        // });
        // select * from a
        // let ref = this
        // let animations = $.chain(function() {
        // }, function() {
        //     return ref.serverProcessDoSelect(hash)
        // });

        this.sendDataFromUserProcessToServerProcess()
        .then((res) => {
            return this.serverProcessDoSelect(hash)
        });
    }

    private sendDataFromUserProcessToServerProcess(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            //animate user process sending 2 server process
            //in this case 4 seconds 2 animate(depends on the delay)
            $('.arrow.from-userp-2-serverp').show()
            $('.arrow.from-userp-2-serverp').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(2).wait().hide()
            $('#server-process').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(2)
            $('#user-process').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(2)
            $('#user img').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(2)
            setTimeout(() => {
                resolve(0);
            }, this.delay * 2 * 2);
        })
    }

    private serverProcessDoSelect(hash: Hash): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            
            let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
            let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
            let sqlConsole: SqlConsole = Orasim.getSqlConsole()

            //finding hash into sharedPool
            if (sharedPool.findHash(hash)) {

                //hash found, server process getting data directly from dbBufferCache
                console.log("hash encontrado")
                let hashIndex = sharedPool.getHashIndex(hash)
                let memoryLocation = dbBufferCache.getMemoryLocation(hashIndex)

                $('#server-process').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(1)
                $(".cache-box-black").animate(
                    { left: "-100px", top: "-131px" },//posicao server process
                    { duration: this.delay })

                //enviar para user process
                Orasim.getSqlConsole().addMsg(new SqlConsoleMessage('info', 'Server process enviando dados para User process'))

                $(".cache-box-black").animate(
                    { left: "-250px", top: "-131px" },//posicao server process
                    { duration: this.delay })
                $(".cache-box-black").hide()

                setTimeout(() => { resolve(0) }, this.delay * 2);
            } else {
                //hash not found, we need 2 get data from database first, and save it into dbBufferCache            
                console.log("hash NAO encontrado hash:", hash)
                //'info', 'Server process enviando dados para User process')
                sqlConsole.addMsg(new SqlConsoleMessage('info', "Server process nao encontrou o hash na SharedPool"))
                sqlConsole.addMsg(new SqlConsoleMessage('info', "Server process criando hash da user query"))
                $('#server-process').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(2)
                $('#shared-pool').repeat().fadeTo(this.delay, 0.1).fadeTo(this.delay, 1).until(2)
                //adicionando hash ha shared pool
                sharedPool.addHash(hash)
                //requisitando dados do dataFiles
                //TODO-joilson remover essa porcaria de adicionar items dinamicamente no DOM do jquery
                let data = $("<div class='cache-box-black'>")
                let dataFiles = $("#data-files").append(data)
                data.animate({ left: "-100px", top: "-131px" },//posicao server process
                    { duration: 2000 })
                //adicionando dados no dbBufferCache
                let hashIndex = sharedPool.getHashIndex(hash)
                let memoryLocation = dbBufferCache.getMemoryLocation(hashIndex)
                console.log(memoryLocation)
                data.animate(memoryLocation,
                    { duration: 2000 })
                //enviando para server process		  
                data.animate({ left: "-100px", top: "-131px" },//posicao server process
                    { duration: 2000 })
                //enviando para user process
                //consoleService.addMessage("Server process enviando dados para User process", 'info');$scope.$apply();
                data.animate(
                    { left: "-250px", top: "-131px" },//posicao user process
                    { duration: 2000 })

                setTimeout(() => { resolve(0); }, this.delay * 8);
            }            
        })
    }

}