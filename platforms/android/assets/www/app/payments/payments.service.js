/**
 * loans Service
 * @namespace PaymentsService
 * @memberOf Services
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('PaymentsService', PaymentsService);

  PaymentsService.$inject = ['$cordovaSQLite','session'];

  /**
   * @namespace PaymentsService
   * @memberOf Payments
   */
  function PaymentsService($cordovaSQLite,session) {
    var service = {
      getPaymentsList: __getPaymentsList,
      delPayment:__delPayment
    };

    return service;

    function __getPaymentsList() {

     var response=[];

      var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      //alert("entro a get payments list"+fecha);
             return $cordovaSQLite.execute(db, 'SELECT * FROM clientes, tarjetas where tarjetas.concliente=clientes.concliente and  tarjetas.fecprestamo=? and tarjetas.nueva=? ',[fecha,1])
            .then(
                    function(res) {

                        //alert(res.rows.length);
                        if (res.rows.length > 0) {
                               // alert(res.rows.length);
                                for (var i=0; i<res.rows.length; i++) {
                                    response.push(res.rows.item(i));
                                    //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }
                                
                        }
                        return response;
                        
                    },
                    function(error) {
                        return false;
                        
                        alert("Error on loading: getpaymentlist " + error.message);
                    }
                );


    }

    function __delPayment(idPayment){

         return $cordovaSQLite.execute(db, 'delete from tarjetas where contarjeta=?',[idPayment])
            .then(
                    function(res) {


                        return true;
                    },
                    function(error) {
                        alert("Error on loading: getpaymentlist " + error.message);
                    }
                );

    }
  }
})();
