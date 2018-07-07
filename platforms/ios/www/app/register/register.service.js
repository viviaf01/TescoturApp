/**
 * DailyExpensesService
 * @namespace DailyExpensesService
 * @memberOf Services
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('RegisterService', RegisterService);

  RegisterService.$inject = ['$cordovaSQLite','session','$http'];

  /**
   * @namespace DailyExpensesService
   * @memberOf DailyExpenses
   */
  function RegisterService($cordovaSQLite,session,$http) {
    var service = {
      //getGastosList: __getGastosList,
      //getExpensesType: __getExpensesType,
      saveTarea: __saveTarea,
      actualizarTarea: __actualizarTarea,
      ///viejos
      InsertPayment: __InsertPayment,
      ExistPayment: __ExistPayment,
      DeletePayment: __DeletePayment,
      updateTarjetaEliminar: __updateTarjetaEliminar,
      updateTarjetaInsercion: __updateTarjetaInsercion,
      getDetalleTarjeta: __getDetalleTarjeta,
      finalizarTarjeta: __finalizarTarjeta,
      VerFinalizarTarjeta: __VerFinalizarTarjeta,
      ConsultarTarjetaPA: __ConsultarTarjetaPA

    };

    return service;

function __saveTarea(dp_id,dp_recorrido,dp_movil){
    
    $http.post('http://www.tescotur.com/app/saveTarea', {"dp_id": dp_id,"dp_recorrido":dp_recorrido, "vehiculo":dp_movil,"conductor":sessionStorage.userId})
                                    .success(function (response) {
                                        //console.log("el servidor respondio", response);
                                return response;

                                    })
                                    .error(function (error) {
                                       // console.log("error servidor", error);
                                return error;
                                    });
                                    //fin envio
    
    }

function __actualizarTarea(dp_id,dp_recorrido,dp_movil){
    
   // console.log("actualizarTarea");
    $http.post('http://www.tescotur.com/app/actualizarTarea', {"dp_id": dp_id,"dp_recorrido":dp_recorrido, "vehiculo":dp_movil,"conductor":sessionStorage.userId})
                                    .success(function (response) {
                                        //console.log("el servidor respondio", response);
                                return true;

                                    })
                                    .error(function (error) {
                                       // console.log("error servidor", error);
                                return false;
                                    });
                                    //fin envio
}
//// Viejos
     function __InsertPayment(data){

      var currDate = new Date();
      var hora = ('0' + currDate.getHours()).slice(-2) + ":" + ('0' + currDate.getMinutes()).slice(-2) ;
      
      
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
    //  alert(data.contarjeta+" "+data.vrpagado+" "+fecha);
      return $cordovaSQLite.execute(db, 'insert into detalletarjeta (contarjeta, valor, fecha, hora) values (?,?,?,?) ',[data.contarjeta,data.vrpagado,fecha,hora]).then(
                    function(res) {

                      //alert("Se inserto un gasto");

                        return true;
                    },
                    function(error) {
                        alert("Error on loading insertar pago: " + error.message);
                        return false;
                    }
                );


    }


function __ConsultarTarjetaPA(tarjeta){

  return $cordovaSQLite.execute(db, 'select valcuota from tarjetas where contarjeta=? ',[tarjeta]).then(
                    function(res) {
                        //alert(res);
                        var cuota=0;
                        if (res.rows.length > 0) {
                                for (var i=0; i<res.rows.length; i++) {
                                  //  response.push(res.rows.item(i));
                                    cuota=parseFloat(res.rows.item(i).valcuota);

                                    }

                        }
                        return cuota;
                    },
                    function(error) {
                        alert("Error on loading: obtener detalle tarjeta " + error.message);
                    }
          );

}
    function __updateTarjetaInsercion(data){

        var currDate = new Date();
        var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);

        return $cordovaSQLite.execute(db, 'update tarjetas set valpagado=((select valpagado from tarjetas where contarjeta=?)+?), fecultpago=? where contarjeta=? ',[data.contarjeta,data.vrpagado,fecha,data.contarjeta]).then(
                    function(res) {


                          return true;

                      //alert("Se inserto un gasto");


                    },
                    function(error) {
                        alert("Error on loading actualizacion tarjeta despues de insercion: " + error.message);
                        return false;
                    }
                );



    }

    function __finalizarTarjeta(data){ /// finalizar tarjeta

      var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);

      return $cordovaSQLite.execute(db, 'update tarjetas set fecfinal=?, finalizada=? where contarjeta=? ',[fecha,1,data.contarjeta]).then(
                  function(res) {


                        return true;

                    //alert("Se inserto un gasto");


                  },
                  function(error) {
                      alert("Error on loading actualizacion tarjeta finalizada: " + error.message);
                      return false;
                  }
              );



    }

    function __VerFinalizarTarjeta(data){ /// veriricar total cuotas

      var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);

      return $cordovaSQLite.execute(db, 'select valpagado, valpagar from tarjetas where contarjeta=? ',[data.contarjeta]).then(
                        function(res) {
                            //alert(res);
                            var response=[];
                            if (res.rows.length > 0) {
                                    for (var i=0; i<res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        }

                            }
                            return response;
                        },
                        function(error) {
                            alert("Error on loading: obtener detalle tarjeta " + error.message);
                        }
              );

    }

    function __updateTarjetaEliminar(data){
            var currDate = new Date();
            var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);

            return $cordovaSQLite.execute(db, 'update tarjetas set finalizada=?, fecultpago=?,  valpagado=((select valpagado from tarjetas where contarjeta=?)-(select valor from detalletarjeta where contarjeta=? and fecha=?)) where contarjeta=? ',[0, null,data.contarjeta,data.contarjeta,fecha,data.contarjeta]).then(
                    function(res) {


                         return true;
                      //alert("Se inserto un gasto");


                    },
                    function(error) {
                        alert("Error on loading actualizar tarjeta despues de eliminar: " + error.message);
                        return false;
                    }
                );



    }
    function __ExistPayment(data){

    //alert(JSON.stringify(data));
    //alert(data.contarjeta +"existe");
      var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      return $cordovaSQLite.execute(db, 'select * from detalletarjeta where contarjeta=? and  fecha=?',[data.contarjeta,fecha]).then(
                    function(res) {

                      if(res.rows.length>0){
                          return true;
                      }else{
                          return false;
                      }
                      //alert("Se inserto un gasto");


                    },
                    function(error) {
                        alert("Error on loading Pago Existente: " + error.message);
                        return false;
                    }
                );


    }

    function __DeletePayment(data){

      var currDate = new Date();
      var fecha=currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + currDate.getDate()).slice(-2);
      return $cordovaSQLite.execute(db, 'delete from detalletarjeta where contarjeta=? and  fecha=?',[data.contarjeta,fecha]).then(
                    function(res) {

                     // alert(res+"elimino");
                      //alert("Se inserto un gasto");

                        return true;
                    },
                    function(error) {
                        alert("Error on loading eliminar pago: " + error.message);
                        return false;
                    }
                );


    }

    function __getDetalleTarjeta(contarj){

            return $cordovaSQLite.execute(db, "SELECT detalletarjeta.iddetalle, clientes.*, tarjetas.*, (tarjetas.valpagar-tarjetas.valpagado) as saldo, (tarjetas.valpagado/tarjetas.valcuota) as numcpagadas FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join detalletarjeta on detalletarjeta.contarjeta=tarjetas.contarjeta WHERE tarjetas.contarjeta =? ",[contarj])
                .then(
                    function(res) {
                        var response=[];
                        if (res.rows.length > 0) {
                                for (var i=0; i<res.rows.length; i++) {
                                    response.push(res.rows.item(i));
                                    }
                        }
                        return response;
                    },
                    function(error) {
                        alert("Error on loading: obtener detalle tarjeta " + error.message);
                    }
                );

        }

  }
})();
