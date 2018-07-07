/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('EnlistCtrl', EnlistCtrl);

    EnlistCtrl.$inject = ['EnlistService','ApiMovilService', 'ApiRecorridosService','GenericService', '$state', '$ionicHistory','$ionicLoading','$ionicScrollDelegate','$location'];

    /**
     * @namespace LoansCtrl
     * @desc Loans Controller
     * @param {Object[]} Dependencies
     * @memberOf Loans.Controller
     */
    function EnlistCtrl(LoansService, ApiMovilService,ApiRecorridosService, GenericService, $state, $ionicHistory,$ionicLoading, $ionicScrollDelegate,$location) {

        var vm = this;
       /* vm.consultarRecorridos=__consultarRecorridos;
        vm.alistamiento=__alistamiento;
        vm.listaVehiculos=[];
        vm.listRecorridos={};*/

        //vm.isReload = $stateParams[0];

        // alert("inside controller"+vm.isReload);
        //  vm.idcliente="";

        // $scope.listItems= [];
        // $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS clientes (concliente INTEGER PRIMARY KEY, idcliente INTEGER , nombre TEXT, ocupacion TEXT, dir INTEGER, numtelefono TEXT, idruta INTEGER)');

        activate();

        function activate() {

             
            
             /*$ionicLoading.show();
           ApiMovilService.get(sessionStorage.userId).then(
                    function(vehiculos){
                        
                        for(var i=0;i<vehiculos.length;i++){
                            vm.listaVehiculos.push(vehiculos[i]);
                        
                        }
                        
                         $ionicLoading.hide();
                    });*/
           
         

        }
        
    /*function __consultarRecorridos(contr){
  
   $ionicLoading.show();
            ApiRecorridosService.get(contr).then(function(tareas){

                console.log(tareas.length);
                
                          if(tareas.length>=1){

                           GenericService.setData(tareas);
                           $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.register');
                                            });
                            
     
       $ionicLoading.hide();
                          }
                          
           });


   }

   function __alistamiento(cont){
        $ionicLoading.show();
        $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.register');
                                            });

        $ionicLoading.hide();
   }*/



        
        
    }
})();
