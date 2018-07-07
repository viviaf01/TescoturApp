/**
 * clients Controller
 * @namespace clients
 * @memberOf Controllers
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ClientsCtrl', ClientsCtrl);

  ClientsCtrl.$inject = ['ClientsService','$state','session','$ionicHistory'];

  /**
   * @namespace ClientsCtrl
   * @desc clients Controller
   * @param {Object[]} Dependencies
   * @memberOf clients.Controller
   */
  function ClientsCtrl(ClientsService,$state,session,$ionicHistory) {
    var vm = this;
    vm.data={};
    vm.clientesList={};
    vm.guardarCliente = __guardarCliente;
    vm.consultarCliente= __consultarCliente;
    activate();

    function activate() {
     // vm.dettarj= GenericService.getData();
      //alert(JSON.stringify(vm.dettarj));
      // alert("entro active cliente");
      __consultarCliente();
    }



///metodo

    function __guardarCliente(){
     // alert("entro guardar cliente");


      ClientsService.insertCliente(vm.data).then(
        function(res){

          if(res==true){
            alert("Se registro el cliente correctamente");
            vm.data={};
            __consultarCliente();
          //  $ionicHistory.clearCache().then(function(){$state.go('tab.clients');});
          }else{

            alert('Diligencie los campos obigatorios');
          }
        }
      );

    }

    function __consultarCliente(){
      //alert("entro consultar cliente");
      ClientsService.consultarCliente().then(
        function(response){
            if(response===false){
                alert('Debe descargar datos');
                $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.sync');
                                               
                                            });
                        
               
            }else{
                vm.clientesList=response;
            }
        }
      );
    }

  }
})();
