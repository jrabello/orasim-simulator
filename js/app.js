angular.module('sgbd', [])

//console Controller
.controller('ConsoleContainerController', function($scope, $rootScope, consoleService, QueryParser) {    
    
    console.log('ConsoleContainerController called!');
    
	//methods   
    //all keypresses are handled here
    $scope.handleKeyPress =  function(keyEvent) {
      //console.log(keyEvent);
      //handle when user pressed enter
      if(keyEvent.keyCode === 13/*ENTER*/){          
          var userInput = jQuery("#console-input").val();          
		  var parser = new QueryParser(userInput);
		  		  
		  //verificando se query foi valida
          consoleService.addMessage('User Process analisando query...','info');
		  if(parser.IsQueryParsedSuccess()){
			  //query valida, gerar evento para animationController
			  $rootScope.$broadcast('animacao', userInput);
		  }else{
			  //query invalida
			  consoleService.addMessage('Erro query invalida!','error');			  
		  }
          
          jQuery("#console-input").val('');
      }
    }
    
	//por estarmos usando jquery, o data bind do consoleData sofre danos por causa da manipulacao do DOM
	//portanto precisamos chamar $watch para monitorar mudancas no service
	$scope.consoleMessages = [];
    $scope.$watch(function() {
		return consoleService.consoleMessages;
	}, function(newValue, oldValue) {
        console.log('$scope.$watch: ', newValue, oldValue);
		$scope.consoleMessages = newValue;
	});
	
    // //queries are parsed here
    // $scope.parseQuery = function(userInput){
        
    //     //var splittedUserInput =  userInput.split(" ");
	// 	//var upperCaseUserInput = userInput.toUpperCase();
                       		
	// 	//query invalida?
	// 	consoleService.addMessage('User Process analisando query...','info');		
	// 	try {
	// 		SQLParser.parse(userInput);			  
	// 	}
	// 	catch (err) {
	// 		consoleService.addMessage('Erro query invalida!','error');	
	// 		return;
	// 	}
	// 	//gerando evento para AnimationController
	// 	$rootScope.$broadcast('animacao', userInput);
	// 	return;		                   
    // }
    
	
})

//animation Controller
.controller('AnimationController', function($scope, consoleService, SharedPool, 
    Crc32, QueryParser, DbBufferCache, User, Server) {
  
  console.log('AnimationController called!');
  
  //controller attributes
  //$scope.isConnected = true;
  var animationDelay = 200;
  $scope.user = new User();
  $scope.server = new Server();  
  $scope.sharedPool = new SharedPool();
  $scope.dbBufferCache = new DbBufferCache();
  $scope.user.setIsConnected(true);
  //console.log('$scope.sharedPool.hashTable:',$scope.sharedPool.hashTable);
  
  //command selector event listener
  //this is an event listener from all other controllers who wish 2 call a command here in AnimationController
  $scope.$on("animacao", function (event, query) {    
    //connect checking
    if(!$scope.user.getIsConnected()){        
        //usuario nao conectado, rodar animacao de conexao
		//e nao fazer chaining com a query 
		//
        $scope.connectAnimation(query,function(query){
            //connection animation finished                        
            $scope.user.setIsConnected(true);
            //console.log('isConnected:', $scope.isConnected);
			$scope.sendQuery2ServerProcessAnimation(query);
        });        
    }else{
        //user connected
        //parsing commands    
        $scope.sendQuery2ServerProcessAnimation(query);
    }          
  });
  
  //select animation
  $scope.selectQueryAnimation =  function () {
      console.log('AnimationController select!!!');      
  }

  //should be removed and added inside proper object
  $scope.sendQuery2ServerProcessAnimation = function (query) {
               
    $scope.animationQueue(        
        function () {			
            return $scope.user.Send2ServerProcAnimation(animationDelay, consoleService, "User Process Enviando query ("+query+") ao server process...");			   
		},
        function () {			
            return $scope.server.ServerSoftParsingAnimation(animationDelay, consoleService, "Server Process parsing query!", query);			   
		},
		function () {
						
			//generate hash from query
			var hash = new Crc32(query).getHash();            			
			if($scope.sharedPool.findHash(hash) === -1){
				//hash nao encontrado
                //adicionando hash ha shared pool
                console.log("hash nao encontrado hash:", hash);
                console.log("sharedPool:", $scope.sharedPool);
				$scope.sharedPool.addHash(hash, 0);
				
				consoleService.addMessage("Server process nao encontrou hash", 'info');$scope.$apply();
				consoleService.addMessage("Server process criando hash da user query", 'info');$scope.$apply();
				jQuery('#server-process').repeat().fadeTo(animationDelay,0.1).fadeTo(animationDelay,1).until(2);
				jQuery('#shared-pool').repeat().fadeTo(animationDelay,0.1).fadeTo(animationDelay,1).until(2);	
								
				//requisitando dados do dataFiles				
				var data = jQuery("<div class='cache-box-black'>");
				var dataFiles = jQuery("#data-files").append(data);							
				data.animate({left: "-100px", top: "-131px"},//posicao server process
                              {duration: 2000});				
				//adicionando dados no dbBufferCache
                consoleService.addMessage("Server process adicionando dados no DbBufferCache", 'info');$scope.$apply();
				var hashValue = $scope.sharedPool.getValue(hash);
				var memoryLocation = $scope.dbBufferCache.getMemoryLocation(hashValue);
				console.log('memoryLocation:', memoryLocation);
				data.animate(memoryLocation,
                              {duration: 2000});
				//enviando de db buffer cache para server process		  
				data.animate({left: "-100px", top: "-131px"},//posicao server process
                              {duration: 2000});
                                
				//enviando para user process
				consoleService.addMessage("Server process enviando dados para User process", 'info');$scope.$apply();
				data.animate({left: "-250px", top: "-131px"},//posicao user process
                              {
                                duration: 2000,
                                complete: function() {
                                    // Animation complete.
                                    data.hide();
                                    data.remove();
                              }
                });
                
				
			}else{
				//hash encontrado
				//consoleService.addMessage("Server process encontrou query hash", 'info');$scope.$apply();
				//
				
				console.log("hash encontrado");
                consoleService.addMessage("Server process encontrou hash("+hash+")", 'info');$scope.$apply();

                //criando black-box
                var data = jQuery("<div class='cache-box-black'>");                              
				jQuery("#db-buffer-cache").append(data);	
                $(".cache-box-black").css({
                    position: 'absolute',
                    top: $(".cache-box-black").position().top,
                    left: $(".cache-box-black").position().left
                });  

                consoleService.addMessage("Server process requisitando dados do DbBufferCache", 'info');$scope.$apply();		  
				data.animate( {top: jQuery("#server-process").position().top-50,
                               left: jQuery("#server-process").position().left-400},//{left: "-200px", top: "-131px"},//posicao server process
                              {duration: 2000});
                              
                // consoleService.addMessage("Server process enviando dados para User process", 'info');$scope.$apply();
				// var hashValue = $scope.sharedPool.getValue(hash);
				// var memoryLocation = $scope.dbBufferCache.getMemoryLocation(hashValue);
				// data.animate({left: "-100px", top: "-131px"},//posicao server process
                //               {duration: 2000});

				//enviar para user process
				consoleService.addMessage("Server process enviando dados para User process", 'info');$scope.$apply();
				data.animate({top: jQuery("#user-process").position().top-50,
                              left: jQuery("#user-process").position().left-400},//posicao server process
                              {
                                duration: 2000,
                                complete: function() {
                                    // Animation complete.
                                    data.hide();
                                    data.remove();
                              }
                });
                
				//jQuery(".cache-box-black").hide();
			}
		},
		function(){
			//jQuery(".cache-box-black").hide();
            //jQuery(".cache-box-black").hide();
            // var data = jQuery("<div class='cache-box-black'>");                              
			// 	jQuery("#db-buffer-cache").append(data);	
            //     $(".cache-box-black").css({
            //         position: 'absolute',
            //         top: $(".cache-box-black").position().top,
            //         left: $(".cache-box-black").position().left
            //     });  
                		  
			// 	data.animate( {top: jQuery("#server-process").position().top,
            //                    left: jQuery("#server-process").position().left},//{left: "-200px", top: "-131px"},//posicao server process
            //                   {duration: 2000,
            //                    complete: function() {
            //                         // Animation complete.
            //                         data.hide();
            //                         data.remove();
            //                   }
            //                 });
		}
	);
  }
  
  //connection animation
  $scope.connectAnimation =  function (query, callback) {
    var delay = 200;    
    $scope.animationQueue(        
        function () {
            //connect animacao 1
            //user process conecta ao listener    
            consoleService.addMessage("Conectando user ao listener process...", 'info');
			jQuery('.arrow.from-userp-2-listenerp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);			          
            jQuery('#listener-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            jQuery('#user-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            return jQuery('#user img').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);            
            // jQuery('#userp-arrow-2-listenerp').animate({opacity: 0.1}, { 
            //                         duration: delay, 
            //                         start: function(){
            //                           jQuery('#userp-arrow-2-listenerp').show();  
            //                         },                                 
            //                         complete: function() {
            //                             jQuery('#userp-arrow-2-listenerp').animate({opacity: 1}, delay); 
            //                         }
            // });  
            // return jQuery('#user img').animate({opacity: 0.1}, { 
            //                         duration: delay,                                  
            //                         complete: function() {
            //                             jQuery('#user img').animate({opacity: 1}, {duration:delay,
            //                                 complete: function(){
            //                                     jQuery('#userp-arrow-2-listenerp').hide();
            //                                     consoleService.addMessage("Conectado ao listener process!",'info');
            //                                     $scope.$apply();  
            //                                 }}); 
            //                         }
            // });
        },
        function () {    
            //connect animacao 2
            jQuery('.arrow.from-userp-2-listenerp').hide();
            consoleService.addMessage("Conectado ao listener process!",'info');//$scope.$apply();
            consoleService.addMessage("Listener criando server process...",'info');//$scope.$apply();
            jQuery('.arrow.from-listenerp-2-serverp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            jQuery('#server-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            return jQuery('#listener-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);              
        },          
        function () {    
            //connect animacao 3            
            jQuery('.arrow.from-listenerp-2-serverp').hide();
            consoleService.addMessage("Server process criado com sucesso!",'info');//$scope.$apply();
            consoleService.addMessage("Server process envia notificação de criação ao Listener",'info');//$scope.$apply();
            jQuery('.arrow.from-serverp-2-listenerp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            jQuery('#server-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            return jQuery('#listener-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);              
        },
        function () {    
            //connect animacao 4            
            jQuery('.arrow.from-serverp-2-listenerp').hide();
            consoleService.addMessage("Listener process recebe notificação",'info');//$scope.$apply();
            consoleService.addMessage("Listener envia notificacao ao User process sobre criação do Server process",'info');//$scope.$apply();
            jQuery('#listener-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            jQuery('.arrow.from-listenerp-2-userp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);            
            return jQuery('#user-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);              
        },        
        function () {    
            //connect animacao 6            
            jQuery('.arrow.from-listenerp-2-userp').hide();
            consoleService.addMessage("User process recebe notificação",'info');//$scope.$apply();
            consoleService.addMessage("User process conectando ao server process...",'info');//$scope.$apply();            
            jQuery('#user-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            jQuery('.arrow.from-userp-2-serverp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
            return jQuery('#server-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);              
        },
        function () {    
            //connect animacao 6            
            jQuery('.arrow.from-userp-2-serverp').hide();
            consoleService.addMessage("Conexão estabelecida com sucesso!",'info');//$scope.$apply();            
            return callback(query);
        }   
   );//end $scope.queue
   
  }//end connectAnimation
  
  //custom queue
  //fila custom que usa promises, para executar grupos de animacoes
  $scope.animationQueue = function (start) {
        var rest = [].splice.call(arguments, 1),
            promise = $.Deferred();

        if (start) {
            $.when(start()).then(function () {
                $scope.animationQueue.apply(window, rest);
            });
        } else {
            promise.resolve();
        }
        return promise;
  }  
  
  //select animation
  $scope.oldSelectAnimationn =  function () {
      var consoleView = jQuery("#console");
      var user = jQuery("#user img");

      // Animação do user process
      // usuario conecta ao listener
      user.queue('myAnimationQueue', function(next){
          user.animate({opacity: 0.1},
                              {
                                  duration: 4000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando user...");
                                    //mostrando arrow do listener
                                    //jQuery('#listener-process').next(".jarrow").show();
                                    consoleService.addMessage("Conectando usuario ao listener process...",'info');                                    
                                  }, 
                                  complete: function() {
                                    //user.animate({opacity: 1}, {duration: 2000});
                                    //consoleView.html (consoleView.html() + "<br/>Finalizando teste user...");
                                    user.animate({opacity: 1}, {duration: 2000});
                                    consoleService.addMessage("Conectado ao listener process!",'info');
                                    $scope.$apply();              
                                    setTimeout(next, 2000);                                                                       
                                  }
                                });
      })

      // Animação do listener process
      // listener cria server process
      .queue('myAnimationQueue', function(next){
          var listenerProcess = jQuery("#listener-process");
          listenerProcess.animate({opacity: 0.1},
                              {
                                  duration: 4000,
                                  start: function() {
                                    //escondendo arrow do listener
                                    //jQuery('#listener-process').next(".jarrow").hide();
                                    //mostrando server process
                                    jQuery('#server-process').show();                                                       
                                    //consoleView.html(consoleView.html() + "<br/>Testando user process...");
                                    consoleService.addMessage("Listener criando server process...",'info');                                    
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    //mostrando arrow server process
                                    //jQuery('#server-process').next(".jarrow").show();                                    
                                    listenerProcess.animate({opacity: 1}, {duration: 2000});
                                    //consoleView.html (consoleView.html() + "<br/>Finalizando user process...");
                                    consoleService.addMessage("Server process criado com sucesso...",'info');
                                    $scope.$apply();
                                    setTimeout(next, 2000);
                                    }
                                });
        })

      
      // Animação do listener process
      // listener notifica user process sobre criacao do server process
      .queue('myAnimationQueue', function(next){
          var listenerProcess = jQuery("#listener-process");          
          listenerProcess.animate({opacity: 0.1},
                              {
                                  duration: 4000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando server process...");
                                    consoleService.addMessage("Listener notifica User process sobre criação de server process",'info');
                                  }, 
                                  complete: function() {
                                    //escondendo arrow server process
                                    //jQuery('#server-process').next(".jarrow").hide();
                                    listenerProcess.animate({opacity: 1}, {duration: 2000});
                                    //consoleView.html (consoleView.html() + "<br/>Finalizando server process...");
                                    consoleService.addMessage("User process recebe notificação do Listener",'info'); 
                                    $scope.$apply();                                   
                                    setTimeout(next, 2000);
                                    }
                                });
        })
        
       // Animação user process
       // conectando no server process
      .queue('myAnimationQueue', function(next){          
          user.animate({opacity: 0.1},
                              {
                                  duration: 2000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando shared pool...");
                                    consoleService.addMessage("User process conectando em Server Process...",'info'); 
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    user.animate({opacity: 1}, {duration: 2000});
                                    //consoleView.html (consoleView.html() + "<br/>Finalizando shared pool...");
                                    consoleService.addMessage("Conexao realizada com sucesso",'info');
                                    $scope.$apply(); 
                                    setTimeout(next, 2000);
                                    }
                                });
        })
        
      // Animação da shared pool
      .queue('myAnimationQueue', function(next){
          var sharedPool = jQuery("#shared-pool");

          sharedPool.animate({opacity: 0.1},
                              {
                                  duration: 2000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando shared pool...");
                                    consoleService.addMessage("Testando shared pool...",'info'); 
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    sharedPool.animate({opacity: 1}, {duration: 2000});
                                    //consoleView.html (consoleView.html() + "<br/>Finalizando shared pool...");
                                    consoleService.addMessage("Finalizando shared pool...",'info');
                                    $scope.$apply(); 
                                    setTimeout(next, 2000);
                                    }
                                });
        })

      // Animação da sql hash
      .queue('myAnimationQueue', function(next){
            //consoleView.html(consoleView.html() + "<br/>Testando sql hash...")
            consoleService.addMessage("Testando sql hash...",'info');
            $scope.$apply();

            var sqlHashDiv = jQuery("<div class='sql-hash'>").html("SQL_ID: <br/>1jk4kle4ha3un9j");
            jQuery("#shared-pool").append(sqlHashDiv);
            sqlHashDiv.show(2000);
            
            //consoleView.html(consoleView.html() + "<br/>Finalizando sql hash...")
            consoleService.addMessage("Finalizando sql hash...",'info');
            $scope.$apply();
            setTimeout(next, 2000);
        })

      // Animação do db buffer cache
      .queue('myAnimationQueue', function(next){
          var dbBufferCache = jQuery("#db-buffer-cache");

          dbBufferCache.animate({opacity: 0.1},
                              {
                                  duration: 2000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando db buffer cache...");
                                    consoleService.addMessage("Testando db buffer cache...",'info');
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    dbBufferCache.animate({opacity: 1}, {duration: 2000});
                                    //consoleView.html (consoleView.html() + "<br/>Finalizando db buffer cache...");
                                    consoleService.addMessage("Finalizando db buffer cache...",'info');
                                    $scope.$apply();
                                    setTimeout(next, 2000);
                                    }
                                });
        })

      // Animação da alocação do db buffer cache
      .queue('myAnimationQueue', function(next){
          //consoleView.html(consoleView.html() + "<br/>Testando alocação do db buffer cache...")
          consoleService.addMessage("Testando alocação do db buffer cache...",'info');
          $scope.$apply();

          var dataFilesDiv = jQuery("#data-files");
          var sqlCacheDiv = jQuery("<div class='cache-box-black'>");

          dataFilesDiv.append(sqlCacheDiv);
          sqlCacheDiv.show(2000);

          sqlCacheDiv.animate({left: "68px", top: "-324px"},
                              {duration: 2000});

          setTimeout(next, 2000);
        })

      .queue('myAnimationQueue', function(next){
          var dataFilesDiv = jQuery("#data-files");
          var sqlCacheDiv = jQuery("<div class='cache-box-black'>");

          dataFilesDiv.append(sqlCacheDiv);
          sqlCacheDiv.show(2000);

          sqlCacheDiv.animate({left: "91px", top: "-324px"},
                  {
                      duration: 2000,
                      complete: function() {

                        //consoleView.html (consoleView.html() + "<br/>Finalizando alocação db buffer cache...");
                        consoleService.addMessage("Finalizando alocação db buffer cache...",'info');
                        $scope.$apply();
                        setTimeout(next, 2000);
                        }
                    });
        })

      // Animação do server process
      .queue('myAnimationQueue', function(next){
          var serverProcess = jQuery("#server-process");

          serverProcess.animate({opacity: 0.1},
                              {
                                  duration: 2000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando server process...");
                                    consoleService.addMessage("Testando server process...",'info');
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    serverProcess.animate({opacity: 1}, {duration: 2000});

                                    //consoleView.html (consoleView.html() + "<br/>Finalizando server process...");
                                    consoleService.addMessage("Finalizando server process...",'info');
                                    $scope.$apply();
                                    setTimeout(next, 2000);
                                    }
                                });
        })


      // Animação do user process
      .queue('myAnimationQueue', function(next){
          var userProcess = jQuery("#user-process");

          userProcess.animate({opacity: 0.1},
                              {
                                  duration: 2000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando user process...");
                                    consoleService.addMessage("Testando user process...",'info');
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    userProcess.animate({opacity: 1}, {duration: 2000});

                                    //consoleView.html (consoleView.html() + "<br/>Finalizando user process...");
                                    consoleService.addMessage("Finalizando user process...",'info');
                                    $scope.$apply();
                                    setTimeout(next, 2000);
                                    }
                                });
        })

      // Animação do user
      user.queue('myAnimationQueue', function(next){
          user.animate({opacity: 0.1},
                              {
                                  duration: 2000,
                                  start: function() {
                                    //consoleView.html(consoleView.html() + "<br/>Testando user...");
                                    consoleService.addMessage("Testando user...",'info');
                                    $scope.$apply();
                                  }, 
                                  complete: function() {
                                    user.animate({opacity: 1}, {duration: 2000});

                                    //consoleView.html (consoleView.html() + "<br/>Finalizando teste user...");
                                    consoleService.addMessage("Finalizando teste user...",'info');
                                    $scope.$apply();
                                    setTimeout(next, 2000);
                                  }
                                });
      })
      .dequeue('myAnimationQueue');

    }//end selectStatement
})

//Services
//service needed by controllers when they need 2 share data
.service('consoleService', function() {
    
  var consoleMessages = [
    //{contents:'msg', type:'error'},
    //{contents:'msg2',type:'info'}
  ];
  var consoleCacheMessages = [
	  
  ];
  
  var addMessage = function(msg, type) {             
      consoleMessages.push({'contents':msg, 'type':type}); 
	  //consoleCacheMessages = angular.copy(consoleMessages);     
	  //consoleMessages = consoleCacheMessages;
      jQuery("#console-input").focus();
  };

  var getMessages = function(){
      return consoleMessages;
  };
    
  return {
    addMessage: addMessage,
    getMessages: getMessages,
	consoleMessages: consoleMessages
  };  
 })


//Factories
//angular objects
.factory('Crc32', function () { 
	
	// Private property	
	var data = "";
	
	//Constructor
	function Crc32(data) {
		// Public properties, assigned to the instance ('this')
		this.data = data;    
	}
	
	// Public method, assigned to prototype	
	Crc32.prototype.getHash = function () {
		return genCrc32(this.data);
	};
		
	// Private method
	function makeCRCTable(){
		var c;
		var crcTable = [];
		for(var n =0; n < 256; n++){
			c = n;
			for(var k =0; k < 8; k++){
				c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
			}
			crcTable[n] = c;
		}
		return crcTable;
	}

	function genCrc32(str) {
		var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
		var crc = 0 ^ (-1);

		for (var i = 0; i < str.length; i++ ) {
			crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
		}

		return (crc ^ (-1)) >>> 0;
	};  

	/**
	 * Return the constructor function
	 */
	return Crc32;
})

.factory('User', function () {
	var isConnected;
	
	//Constructor
	function User() {
		this.isConnected = false;	
	}
    
    User.prototype.Send2ServerProcAnimation = function(delay, consoleService, msg){
        consoleService.addMessage(msg, 'info');//$scope.$apply();
        jQuery('#server-process').show();
        jQuery('.arrow.from-userp-2-serverp').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
        jQuery('#server-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
        jQuery('#user-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
        return jQuery('#user img').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);        
    }
	
	User.prototype.setIsConnected = function (connected) {        
		this.isConnected = connected;
        console.log('this.isConnected1:', this.isConnected);
        console.log('connected:', connected);
	};
	
	User.prototype.getIsConnected = function () {
        console.log('this.isConnected2:',this.isConnected);
		return this.isConnected;
	};
	
	return User;
})

.factory('Server', function (QueryParser) {
	var ip;
    var port;
	
	//Constructor
	function Server() {
			
	}
    
    AnimateServerProcess = function(delay){                
        return jQuery('#server-process').repeat().fadeTo(delay,0.1).fadeTo(delay,1).until(2);
    }
    
    Server.prototype.ServerSoftParsingAnimation = function(delay, consoleService, msg, query){
        consoleService.addMessage("Server process realizando Soft-Parsing", 'info');//$scope.$apply();
        			
        var parser = new QueryParser(query);
        if(!parser.IsQueryParsedSuccess()){
            consoleService.addMessage("Server process erro no Soft-Parsing!", 'info');//$scope.$apply();
            return;		  
        }
        jQuery('.arrow.from-userp-2-serverp').hide();
        return AnimateServerProcess(delay);
    }
	
	return Server;
})

.factory('QueryParser',function(){
	
	var isQueryParsedSuccess = false;
	
	function QueryParser(query) {		
		//consoleService.addMessage(procName+' process analisando query...','info');				
		try {
			SQLParser.parse(query);	
			this.isQueryParsedSuccess = true;
		}
		catch (err) {
			//consoleService.addMessage('Erro query invalida!','error');
			this.isQueryParsedSuccess = false;	
			return;
		}	
	} 	
		
	QueryParser.prototype.IsQueryParsedSuccess = function () {
		return this.isQueryParsedSuccess;
	};
	
	return QueryParser;
	
})

.factory('SharedPool',function(){
	
	var hashTable;
	
	function SharedPool() {        
		this.hashTable = {};			
	} 
			
	SharedPool.prototype.addHash = function (hash, value) {
		this.hashTable[hash] = value;
	};
	
	SharedPool.prototype.getValue = function (hash) {
		return this.hashTable[hash];
	};
	
	//returns -1 if not found, value otherwise
	SharedPool.prototype.findHash = function (hash) {		
	    if(this.hashTable.hasOwnProperty(hash)){
            return this.hashTable[hash];
        }
		return -1;
	};
	
	return SharedPool;	
})

.factory('DbBufferCache',function(){
	
	var mapArr = [];
    var blocks;
	
	function DbBufferCache() {
		//posicao do elemento no dbBufferCache
		this.mapArr = [];
		this.mapArr.push({left: "150px", top: "-321px"});
		this.blocks = 36;
	} 
	
    DbBufferCache.prototype.getBlocks = function(){
        return this.blocks;   
    }
    	
    DbBufferCache.prototype.getBlocksArr = function(){
        return new Array(this.blocks);   
    }
    
	DbBufferCache.prototype.getMemoryLocation = function (value) {
		return this.mapArr[value];
	};
			
	return DbBufferCache;	
});