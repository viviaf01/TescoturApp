/**
 * Login Controller
 * @namespace Login
 * @memberOf Controllers
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'LoginService', '$ionicPopup', '$state'];


  /**
   * @namespace LoginCtrl
   * @desc Login Controller
   * @param {Object[]} Dependencies
   * @memberOf Login.Controller
   */
  function LoginCtrl($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.login = login;
    activate();

    function activate() {

        $scope.data.username='ANDRESG';
        $scope.data.password='tre5do5un0';

    }

    function login() {
      LoginService.validateCredentials($scope.data).then(function(data) {
        if(data){
            
            LoginService.validateLogDay().then(
                    function(valida){
                       
                        if(valida===true){
                            $state.go('tab.loan',{"isReload":false});
                        }
                        else{
                           //
                           LoginService.existeCliente().then(
                                   function(resCliente){
                                       
                                       
                                       if(resCliente===true){
                                           __copiaDatos();
                                       }
                                       else{
                                   LoginService.SaveLogLogin().then(function(response){
                                       
                                        if(response==true){
                                            
                                            $state.go('tab.sync',{"isReload":false});
                                        }
                                    }); 
                              }
                                   });
                                ///
                          
                            
                            // 
                        }
                    });
            
          
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Erro de Inicio de Sesion',
            template: 'Por favor verifique datos de acceso'
          });
        }
      });
    }
    
    function __copiaDatos(){
        
         LoginService.copiaTarjetas().then(function(cpTarjeta){
                               
                              
                              if(cpTarjeta==true){
                                 
                                  LoginService.copiaClientes().then(
                                          function(cpClientes){
                                             
                                              if(cpClientes==true){
                                                  
                                                  LoginService.copiaDetalleTarjetas().then(
                                                          function(cpDetTarj){
                                                             
                                                              if(cpDetTarj==true){
                                                                  LoginService.copiaEgreso().then(
                                                                          function(cpEgreso){
                                                                             
                                                                              if(cpEgreso==true){
                                                                                  ///
                                                                                    LoginService.SaveLogLogin().then(function(response){
                                                                                       
                                                                                        if(response==true){
                                                                                            $state.go('tab.sync',{"isReload":false});
                                                                                        }
                                                                                    }); 
                                                                                    //
                                                                              }
                                                                          });
                                                              }
                                                          });
                                                  
                                                 
                                              }
                                          });
                                  
                              } 
                              
                           });
    }
  }
})();
