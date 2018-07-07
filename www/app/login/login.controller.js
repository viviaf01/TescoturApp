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

  LoginCtrl.$inject = ['$scope','ApiUsersService', '$ionicPopup', '$state','session'];


  /**
   * @namespace LoginCtrl
   * @desc Login Controller
   * @param {Object[]} Dependencies
   * @memberOf Login.Controller
   */
  function LoginCtrl($scope,  ApiUsersService, $ionicPopup, $state, session) {
    $scope.data = {};
    $scope.login = login;
    activate();

    function activate() {

        //$scope.data.username='ANDRESG';
        //$scope.data.password='tre5do5un0';

    }

    function login() {
        
        ApiUsersService.get($scope.data.username).then( function(datos){
            
            
            if(datos[0].codigo_cond==$scope.data.password){ 
                sessionStorage.userId = datos[0].em_id;
                sessionStorage.name = datos[0].em_nombre;
                sessionStorage.cargo= datos[0].em_cargo;
                
                
                $state.go('tab.loan',{"isReload":false});
            }else{
            var alertPopup = $ionicPopup.alert({
            title: 'Erro de Inicio de Sesion',
            template: 'Por favor verifique datos de acceso'
          });
            }
            
        })
        
    }
    
  }
})();
