/**
 * sync Service
 * @namespace syncservice
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('syncservice', syncservice);

    syncservice.$inject = ['$cordovaSQLite', 'ApiClientsService', 'ApiLoanService', 'ApiHappyDaysService', 'ApiExpensesTypeService', 'ApiRoutesService', 'session', '$http'];

    /**
     * @namespace syncservice
     * @memberOf sync
     */
    function syncservice($cordovaSQLite, ApiClientsService, ApiLoanService, ApiHappyDaysService, ApiExpensesTypeService, ApiRoutesService, session, $http) {
        var service = {
            tarjetas: __tarjetas, //tarjetas clientes detallepago
            clientesNuevos: __clientesNuevos,
            gastos:__gastos,
            uploadData: __uploadData,
           

            downloadInformation: __downloadInformation,
            downloadCards: __downloadCards,
            downloadHappyDays: __downloadHappyDays,
            downloadExpensesType: __downloadExpensesType,
            downloadRoutes: __downloadRoutes
        };

        return service;

        function __tarjetas() { // tarjetas Nuevas Clientes Nuevos

            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

// and  clientes.nuevo=? and tarjetas.nueva=?
//, ['1', '1']
            return $cordovaSQLite.execute(db, 'SELECT * FROM tarjetas, clientes left join detalletarjeta on detalletarjeta.contarjeta=tarjetas.contarjeta  where tarjetas.concliente=clientes.concliente')
                    .then(
                            function (res) {
                                var response = [];
                                if (res.rows.length > 0) {

                                    for (var i = 0; i < res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }

                                }
                                //alert("RESP=>"+response.length);
                                return response;
                            },
                            function (error) {
                                alert("Error on loading: " + error.message);
                            }
                    );
        }

        function __gastos() { // gastos

            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

// and  clientes.nuevo=? and tarjetas.nueva=?
//, ['1', '1']
            return $cordovaSQLite.execute(db, 'SELECT * FROM egreso ')
                    .then(
                            function (res) {
                                var response = [];
                                if (res.rows.length > 0) {

                                    for (var i = 0; i < res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }

                                }
                                //alert("RESP=>"+response.length);
                                return response;
                            },
                            function (error) {
                                alert("Error on loading: " + error.message);
                            }
                    );
        }
        

        function __uploadData() {

            __tarjetas().then(
                    function (tarjetas) {
                        __gastos().then(
                                function(gastos){
                                   ///envio
                                    $http.post('http://brapres.net/datos_app/guardar.php', {"tarjetas": tarjetas,"gastos":gastos})
                                    .success(function (response) {
                                        console.log("el servidor respondio", response);

                                    })
                                    .error(function (error) {
                                        console.log("error servidor", error);
                                    });
                                    //fin envio 
                                }
                                );

                        

            });



        }

        function __clientesNuevos() {

            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);


            return $cordovaSQLite.execute(db, 'SELECT * FROM clientes  where nuevo=? ', ['1'])
                    .then(
                            function (res) {
                                var response = [];
                                if (res.rows.length > 0) {

                                    for (var i = 0; i < res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }
                                           return response;
                                }else{
                                    return false;
                                }
                                //alert("RESP=>"+response.length);
                                
                            },
                            function (error) {
                                alert("Error on loading: " + error.message);
                            }
                    );
            
        }


        ///descargar clientestes
        function __downloadInformation() {

            // Crear Clientes
            $cordovaSQLite.execute(db, 'DROP TABLE clientes');


            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS clientes (concliente INTEGER PRIMARY KEY, idcliente INTEGER , nombre TEXT, ocupacion TEXT, dir INTEGER, numtelefono TEXT, idruta INTEGER, nuevo INTEGER)');
            // execute INSERT clientes with parameter


            return ApiClientsService.getLoan().then(function (data) {

                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO clientes (concliente,idcliente,nombre,ocupacion,dir,numtelefono,idruta,nuevo) VALUES (?,?,?,?,?,?,?,?)', [data.response[i].conCliente, data.response[i].idCliente, data.response[i].nombre, data.response[i].ocupacion, data.response[i].dir, data.response[i].numTelefono, data.response[i].idRuta, 0]).then(function (result) {
                        //    alert("insert clientes "+result);
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        alert("Error on saving: clientes " + error.message);
                    });
                }



            });


        }


        ///// descargar rutas

        function __downloadRoutes() {

            //alert("entro rutas");
            // Crear Clientes
            $cordovaSQLite.execute(db, 'DROP TABLE rutas');


            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS rutas (idruta INTEGER PRIMARY KEY, nombre INTEGER , porcruta integer, cuotasruta integer, moneda TEXT, conusuario integer, prestamomaximo INTEGER, idpais TEXT)');
            // execute INSERT RUTAS with parameter


            return ApiRoutesService.getRoutes().then(function (data) {

                // alert(data)
                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO rutas (idruta,nombre,porcruta,cuotasruta,moneda,conusuario,prestamomaximo,idpais) VALUES (?,?,?,?,?,?,?,?)', [data.response[i].idRuta, data.response[i].nombre, data.response[i].porcRuta, data.response[i].cuotasRuta, data.response[i].moneda, data.response[i].conUsuario, data.response[i].prestamoMaximo, data.response[i].idPais]).then(function (result) {

                        sessionStorage.idruta = data.response[i].idRuta;
                        sessionStorage.porcruta = data.response[i].porcRuta;
                        sessionStorage.pais = data.response[i].idPais;
                        sessionStorage.prestamoMaximo = data.response[i].prestamoMaximo;
                        //  alert(sessionStorage.prestamoMaximo);
                        sessionStorage.cuotasRuta = data.response[i].cuotasRuta;

                        //    alert("insert clientes "+result);
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        alert("Error on saving rutas: " + error.message);
                    });
                }



            });


        }


        function __downloadCards() {

            // Crear tarjetas
            $cordovaSQLite.execute(db, 'DROP TABLE tarjetas');

            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS tarjetas (contarjeta INTEGER PRIMARY KEY, numtarjeta INTEGER , anyo INTEGER, valprestamo TEXT, valpagar TEXT, preespcial INTEGER, valcuota TEXT, numcuotas INTEGER, fecprestamo TEXT, fecinicio  TEXT, fecfinal TEXT, finalizada INTEGER, fecultpago TEXT, ordenruta INTEGER, concliente INTEGER, frecpago TEXT, valpagado INTEGER, nueva integer)');



            return ApiLoanService.getTarj().then(function (data) {


                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO tarjetas (contarjeta, numtarjeta, anyo, valprestamo, valpagar, preespcial, valcuota, numcuotas, fecprestamo, fecinicio, fecfinal, finalizada, fecultpago, ordenruta, concliente, frecpago, valpagado,nueva) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.response[i].conTarjeta, data.response[i].numTarjeta, data.response[i].anyo, data.response[i].valPrestamo, data.response[i].valPagar, data.response[i].preEspecial, data.response[i].valCuota, data.response[i].numCuotas, data.response[i].fecPrestamo, data.response[i].fecInicio, data.response[i].fecFinal, data.response[i].finalizada, data.response[i].fecAbono, data.response[i].ordenRuta, data.response[i].conCliente, data.response[i].frecPago, data.response[i].valPagado, 0])
                            .then(function (result) {
                                //    alert("insert clientes "+result);
                                //alert("Message saved successful, cheers!" + data.response[i].nombre);
                            }, function (error) {
                                alert("Error saving tarjetas " + error.message);
                            });
                }



            });

        }
        ////

        ////descargar Dias Festivos


        function __downloadHappyDays() {

            // Crear festivos
            $cordovaSQLite.execute(db, 'DROP TABLE festivos');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS festivos (idfestivos INTEGER PRIMARY KEY, anio INTEGER, mes INTEGER , dia INTEGER, idpais TEXT)');



            return ApiHappyDaysService.getHappyDays().then(function (data) {


                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO festivos (idfestivos, anio, mes, dia, idpais) VALUES (?,?,?,?,?)', [data.response[i].idFestivos, data.response[i].anyo, data.response[i].mes, data.response[i].dia, data.response[i].idPais])
                            .then(function (result) {
                                //alert("insert festivo "+result);
                                //alert("Message saved successful, cheers!" + data.response[i].nombre);
                            }, function (error) {
                                alert("Error on saving festivos: " + error.message);
                            });
                }



            });

        }
        ///////

        ////descargar Dias Festivos


        function __downloadExpensesType() {

            // Crear festivos
            $cordovaSQLite.execute(db, 'DROP TABLE conceptoegreso');
            $cordovaSQLite.execute(db, 'DROP TABLE detalletarjeta');
            //$cordovaSQLite.execute(db, 'DROP TABLE detalletarjeta');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS conceptoegreso (idconceptoegreso INTEGER PRIMARY KEY, nombre TEXT , oculto INTEGER, reqobser INTEGER, posicion INTEGER, titulo TEXT, valor INTEGER)');

            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS detalletarjeta (iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, contarjeta INTEGER ,  valor INTEGER, fecha TEXT, hora TEXT)');

            //$cordovaSQLite.execute(db, 'DROP TABLE egreso');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS egreso (idegreso INTEGER PRIMARY KEY AUTOINCREMENT, valor INTEGER , fecha TEXT, idconceptoegreso INTEGER, observaciones TEXT, idruta INTEGER)');


            return ApiExpensesTypeService.getETS().then(function (data) {


                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO conceptoegreso (idconceptoegreso, nombre, oculto, reqobser,posicion, titulo, valor) VALUES (?,?,?,?,?,?,?)', [data.response[i].idConceptoEgreso, data.response[i].nombre, data.response[i].oculto, data.response[i].reqObser, data.response[i].posicion, data.response[i].titulo, data.response[i].valor])
                            .then(function (result) {
                                //alert("insert festivo "+result);
                                //alert("Message saved successful, cheers!" + data.response[i].nombre);
                            }, function (error) {
                                alert("Error on saving conceptoegreso: " + error.message);
                            });
                }



            });

        }
        ///////




    }
})();
