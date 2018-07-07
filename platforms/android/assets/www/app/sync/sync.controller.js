/**
 * Sync Controller
 * @namespace Sync
 * @memberOf Controllers
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('SyncCtrl', SyncCtrl);

    SyncCtrl.$inject = ['syncservice', 'GenericService', '$state', '$ionicHistory'];

    /**
     * @namespace SyncCtrl
     * @desc Sync Controller
     * @param {Object[]} Dependencies
     * @memberOf Sync.Controller
     */
    function SyncCtrl(syncservice, GenericService, $state, $ionicHistory) {
        var vm = this;
        vm.sincronizar=true;
        vm.uploadData = __uploadData;
        vm.downloadData = __downloadData;
        vm.verConective= __verConective;
        vm.verConectiveUpload= __verConectiveUpload;
        activate();

        function activate() {
                
        }

        function __verConective(){

          if(navigator.onLine==false){

             alert('El dispositivo no esta conectado a internet. Verifique su conexión e intente nuevamente la descarga de datos');
           }else{

             __downloadData();
           }

        }

        function __verConectiveUpload(){

          if(navigator.onLine==false){

             alert('El dispositivo no esta conectado a internet. Verifique su conexión e intente nuevamente la carga de datos');
           }else{

             __uploadData();
           }

        }
        function __downloadData() {

            syncservice.consultarDetalle().then(
                        function (detalle){
                            if(detalle==true){
                                alert('Ya se realizo descarga de datos');
                            }else{
                                syncservice.downloadExpensesType().then(function (responseET) {

                syncservice.downloadHappyDays().then(function (responseHpD) {

                    syncservice.downloadInformation().then(function (response) {

                        syncservice.downloadRoutes().then(function (responseRoute) {

                            syncservice.downloadCards().then(function (responseCard) {

                                alert("Se descargo la información correctamente");
                                
                                $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.loan');
                                                
                                            });

                                //$ionicHistory.clearCache().then(function () {
                                  //      $state.go('tab.loan');
                                //});

                            });
                        });
                    });
                });
            });
                            }
                            
                        });
                        
            




        }

        function __uploadData() {

            syncservice.uploadData();


        }

    }
})();
