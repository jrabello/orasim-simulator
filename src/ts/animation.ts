import { SqlParser } from './sql.parser'

export class Animation{
    private delay: number
    
    constructor(){
        this.delay = 1000
        
        // taken from http://stackoverflow.com/questions/10370298/how-do-i-animate-in-jquery-without-stacking-callbacks
        //overriding jquery object
        //this chain method makes sure animations are executed 
        //in order using promises
        $.chain = function() {
            var promise = $.Deferred().resolve().promise();
            jQuery.each( arguments, function() {
                promise = promise.pipe( this );
            });
            return promise;
        };       
    }

    start(sqlParser: SqlParser){        
        if(sqlParser.getQueryToken() == "SELECT"){
           
        }
    }

    sendFromUserProcessToServerProcess(): void{
        
        //animate user process sending 2 server process
        $('.arrow.from-userp-2-serverp').show()
        $('.arrow.from-userp-2-serverp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2).wait().hide()
        $('#server-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2)
        $('#user-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2)
        $('#user img').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2)
        
        return            
    }
}