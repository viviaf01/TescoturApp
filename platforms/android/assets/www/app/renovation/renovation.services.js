/**
 * loans Service
 * @namespace PaymentsService
 * @memberOf Services
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('RenovationService', RenovationService);

  RenovationService.$inject = ['$cordovaSQLite','session'];

  /**
   * @namespace PaymentsService
   * @memberOf Payments
   */
  function RenovationService($cordovaSQLite,session) {
    var service = {
        getCustomerList: __getCustomerList,
        getNumTarjeta: __getNumTarjeta,
        getFestivos: __getFestivos,
        InsertTarjeta: __InsertTarjeta
    };

    return service;

        function __getCustomerList(){
            //alert("ingreso getcustomerlist create");
            //var response = false;
            // Execute SELECT statement to load message from database.

            var currDate = new Date();
            var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);

             return $cordovaSQLite.execute(db, 'SELECT * FROM clientes order by nombre')
            //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                .then(
                    function(res) {

                        var response=[];
                       // alert("clientes "+res.rows.length);
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
                        alert("Error on loading: " + error.message);
                    }
                );


        }

function __getNumTarjeta(){


             return $cordovaSQLite.execute(db, 'SELECT max(numtarjeta)+1 as ultima FROM tarjetas ')
            //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                .then(
                    function(res) {

                        var response=res.rows.item(0).ultima;

                       return response;

                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                    }
                );


        }

    function __getFestivos(){

         var response=[];
        return $cordovaSQLite.execute(db, 'SELECT * FROM festivos where idpais=? ',[sessionStorage.pais])
            //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                .then(
                    function(res) {


                        if (res.rows.length > 0) {
                               //

                                //alert("numero Festivos"+res.rows.length);
                                for (var i=0; i<res.rows.length; i++) {
                                    response.push(res.rows.item(i));
                                    //alert("festivos: " +i+" "+ res.rows.item(i).mes+" "+ res.rows.item(i).dia );
                                    }

                        }

                       return response;

                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                    }
                );

    }


    // insertar tarjeta nueva

    function __InsertTarjeta(data){


      if(data.numcuotas>72){
        alert("Numero de cuotas no debe ser mayor a 72");
        return false;}
      else{
      var currDate = new Date();
      var fechaI= new Date();
        fechaI.setDate(fechaI.getDate()+1)
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      var fechaini=fechaI.getFullYear() + '/' + ('0' + (fechaI.getMonth() + 1)).slice(-2) +'/' + ('0' + fechaI.getDate()).slice(-2);

      var pEspecial=0;
      if(data.preespecial==false){
          pEspecial=1;
      }

    
        return $cordovaSQLite.execute(db, 'insert into tarjetas (numtarjeta, anyo, valprestamo, valpagar, preespcial, valcuota, numcuotas, fecprestamo, fecinicio, fecfinal, concliente, valpagado, nueva,ordenruta) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',[data.numerotarjeta,currDate.getFullYear(),data.valprestamo,data.valpagar,pEspecial,data.valcuota,data.numcuotas,data.fecprestamo,fechaini,data.fecfinal,data.concliente,0,1,sessionStorage.idruta]).then(
                    function(res) {

                      //alert("Se inserto un gasto");

                        return true;
                    },
                    function(error) {
                        alert("Error on loading: " + error.message);
                        return false;
                    }
                );

                }
    }

  }
})();
