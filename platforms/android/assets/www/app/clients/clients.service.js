/**
 * ClientsService
 * @namespace ClientsService
 * @memberOf Services
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('ClientsService', ClientsService);

  ClientsService.$inject = ['$cordovaSQLite','session'];

  /**
   * @namespace ClientsService
   * @memberOf Clients
   */
  function ClientsService($cordovaSQLite,session) {
    var service = {

     insertCliente: __insertCliente,
     consultarCliente: __consultarCliente

    };

    return service;




    function __insertCliente(data){

           // Execute SELECT statement to load message from database.
            return $cordovaSQLite.execute(db, 'insert into clientes (idcliente , nombre, ocupacion, dir, numtelefono, idruta, nuevo) values (?,?,?,?,?,?,?) ',[data.idcliente,data.nombre,data.ocupacion,data.dir,data.numtelefono,sessionStorage.idruta,1]).then(
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

    function __consultarCliente(){

            return $cordovaSQLite.execute(db, 'SELECT * FROM clientes where nuevo=? ',[1])
                .then(
                    function(res) {
                        var response=[];

                      //  console.log(res.rows.length);
                        if (res.rows.length > 0) {

                                for (var i=0; i<res.rows.length; i++) {
                                    response.push(res.rows.item(i));
                                    //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }

                        }
                        //alert(response)
                        return response;
                    },
                    function(error) {
                        return false;
                        alert("Error on loading: " + error.message);
                    }
                );

    }



  }
})();
