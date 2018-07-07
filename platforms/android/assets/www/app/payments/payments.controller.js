/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PaymentsCtrl', PaymentsCtrl);

  PaymentsCtrl.$inject = ['PaymentsService','$state','$ionicHistory'];

  /**
   * @namespace LoansCtrl
   * @desc Loans Controller
   * @param {Object[]} Dependencies
   * @memberOf Loans.Controller
   */
  function PaymentsCtrl(PaymentsService,$state,$ionicHistory) {
    var vm = this;
    vm.paymentsList={};
    vm.formTarjeta= __formTarjeta;
    vm.consultarTarjetas= __consultarTarjetas;
    vm.deleteTarjeta= __deleteTarjeta;
    vm.askDeleteTarjeta= __askDeleteTarjeta;
    //vm.customerEdit=customerEdit;

    activate();

    function activate() {
      
              
                PaymentsService.getPaymentsList().then(function(listaTarjetas){
                    
                    if(listaTarjetas===false){
                        alert('Debe descargar datos');
                        $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.sync');
                                               
                                            });
                        
          
                    }else{
                        vm.paymentsList = listaTarjetas
                    }
                });
      
      
    }

    function __formTarjeta(){

       
        $state.go('tab.createpayments');
        //console.log("Editing " + id);
      
    }

    function __consultarTarjetas(){
      PaymentsService.getPaymentsList().then(
        function(tarjetas){
          vm.paymentsList=tarjetas; 
          $ionicHistory.clearCache().then(function(){$state.go('tab.payments');});
        }
      )


    }

    function __askDeleteTarjeta(idTarjeta){
    
    if(confirm('¿Desea eliminar la tarjeta?')==true){
        
        __deleteTarjeta(idTarjeta);
        
    }
}
    function __deleteTarjeta(idTarjeta){

      
        PaymentsService.delPayment(idTarjeta).then(

            function (respuesta){
                if(respuesta==true){
                  alert('Se elimino la tarjeta correctamente');

                  __consultarTarjetas();

                }
            }
        )

    }
  }
})();
