/**
 * loans Service
 * @namespace LoansService
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('LoansService', LoansService);

    LoansService.$inject = ['$cordovaSQLite', 'ApiClientsService', 'ApiLoanService', 'ApiHappyDaysService', 'ApiExpensesTypeService', 'ApiRoutesService', 'session'];

    /**
     * @namespace LoansService
     * @memberOf loans
     */
    function LoansService($cordovaSQLite, ApiClientsService, ApiLoanService, ApiHappyDaysService, ApiExpensesTypeService, ApiRoutesService,  session) {
        var service = {
            getCustomerList: __getCustomerList,
            downloadInformation: __downloadInformation,
            downloadCards: __downloadCards,
            downloadHappyDays: __downloadHappyDays,
            downloadExpensesType: __downloadExpensesType,
            downloadRoutes: __downloadRoutes,
            getCustomerListWhere: __getCustomerListWhere,
            getDetalleTarjeta: __getDetalleTarjeta,
            getCustomerLoans: __getCustomerLoans,
            verificar_db: __verificar_db,
            getOrdenRuta: __getOrdenRuta,
            getRutas: __getRutas,
            getTotalClientes: __getTotalClientes
            
        };

        return service;

///////

        function __verificar_db() {
            

            try {

                $cordovaSQLite.execute(db, 'select * from  tarjetas');

                return true;

            } catch ($cordovaSQLite) {

                return false;
            }

        }

        function __downloadCards() {

            // Crear tarjetas
            $cordovaSQLite.execute(db, 'DROP TABLE tarjetas');

            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS tarjetas (contarjeta INTEGER PRIMARY KEY, numtarjeta INTEGER , anyo INTEGER, valprestamo TEXT, valpagar TEXT, preespcial INTEGER, valcuota TEXT, numcuotas INTEGER, fecprestamo TEXT, fecinicio  TEXT, fecfinal TEXT, finalizada INTEGER, fecultpago TEXT, ordenruta INTEGER, concliente INTEGER, frecpago TEXT, valpagado INTEGER, nueva integer)');



            return ApiLoanService.getTarj().then(function (data) {

                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO tarjetas (contarjeta, numtarjeta, anyo, valprestamo, valpagar, preespcial, valcuota, numcuotas, fecprestamo, fecinicio, fecfinal, finalizada, fecultpago, ordenruta, concliente, frecpago, valpagado,nueva) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.response[i].conTarjeta, data.response[i].numTarjeta, data.response[i].anyo, data.response[i].valPrestamo, data.response[i].valPagar, data.response[i].preEspecial, data.response[i].valCuota, data.response[i].numCuotas, data.response[i].fecPrestamo, data.response[i].fecInicio, data.response[i].fecFinal, data.response[i].finalizada, data.response[i].fecUltPago, data.response[i].ordenRuta, data.response[i].conCliente, data.response[i].frecPago, data.response[i].valPagado, 0])
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
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS festivos (idfestivos INTEGER PRIMARY KEY, mes INTEGER , dia INTEGER, idpais TEXT)');



            return ApiHappyDaysService.getHappyDays().then(function (data) {


                for (let i = 0; i < data.response.length; i++) {
                    $cordovaSQLite.execute(db, 'INSERT INTO festivos (idfestivos, mes, dia, idpais) VALUES (?,?,?,?)', [data.response[i].idFestivos, data.response[i].mes, data.response[i].dia, data.response[i].idPais])
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

            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS detalletarjeta (iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, contarjeta INTEGER ,  valor INTEGER, fecha TEXT)');

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
                        //alert(sessionStorage.prestamoMaximo);
                        sessionStorage.cuotasRuta = data.response[i].cuotasRuta;

                        //    alert("insert clientes "+result);
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        alert("Error on saving rutas: " + error.message);
                    });
                }



            });


        }

//////
function __getRutas(){
    
    return $cordovaSQLite.execute(db, 'SELECT * FROM rutas ', [])
                    //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                    .then(
                            function (res) {
                                var response = 0;
                                if (res.rows.length > 0) {
                                    // alert(res.rows.length);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        response=res.rows.item(i);
                                    }
                                    
                                }
                                return response;
                                
                            },
                            function (error) {
                                console.log("Error on loading: " + error.message);
                                return false;
                                
                            }
                    );
    
}
        function __getOrdenRuta(){
            
            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);
            
            return $cordovaSQLite.execute(db, 'SELECT count(tarjetas.contarjeta) as totalOrden FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join (select contarjeta as detcontarjeta, valor as detvalor, fecha as detfecha from detalletarjeta where fecha=?) as detallet on detallet.detcontarjeta=tarjetas.contarjeta where tarjetas.ordenruta <>0', [fecha])
                    //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                    .then(
                            function (res) {
                                var response = 0;
                                if (res.rows.length > 0) {
                                    // alert(res.rows.length);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        response=res.rows.item(i).totalOrden;
                                    }
                                    
                                }
                                return response;
                                
                            },
                            function (error) {
                                console.log("Error on loading: " + error.message);
                                return false;
                                
                            }
                    );
        }
        
        function __getTotalClientes(){
            
            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);
            
            return $cordovaSQLite.execute(db, 'SELECT count(tarjetas.contarjeta) as totalOrden FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join (select contarjeta as detcontarjeta, valor as detvalor, fecha as detfecha from detalletarjeta where fecha=?) as detallet on detallet.detcontarjeta=tarjetas.contarjeta', [fecha])
                    //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                    .then(
                            function (res) {
                                var response = 0;
                                if (res.rows.length > 0) {
                                    // alert(res.rows.length);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        response=res.rows.item(i).totalOrden;
                                    }
                                    
                                }
                                return response;
                                
                            },
                            function (error) {
                                console.log("Error on loading: " + error.message);
                                return false;
                                
                            }
                    );
        }
        
        function __getCustomerList(tClientes,tOrden) {
            // alert("ingreso getcustomerlist");
            //var response = false;
            // Execute SELECT statement to load message from database.
            
            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);
            
            var SQLvari="";
           
           
           if((tOrden/tClientes)>=0.7){
               
               SQLvari='SELECT finalizada, contarjeta,detvalor,nombre, clientes.concliente, (julianday("now")-julianday(tarjetas.fecultpago)) as dias_np, numcuotas,((tarjetas.valpagar-tarjetas.valpagado)/tarjetas.valcuota) as cuotaspendientes , tarjetas.fecultpago FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join (select contarjeta as detcontarjeta, valor as detvalor, fecha as detfecha from detalletarjeta where fecha=?) as detallet on detallet.detcontarjeta=tarjetas.contarjeta order by tarjetas.ordenruta ASC';
               
           }else{
               SQLvari='SELECT finalizada, contarjeta,detvalor,nombre, clientes.concliente, (julianday("now")-julianday(tarjetas.fecultpago)) as dias_np, numcuotas,((tarjetas.valpagar-tarjetas.valpagado)/tarjetas.valcuota) as cuotaspendientes , tarjetas.fecultpago FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join (select contarjeta as detcontarjeta, valor as detvalor, fecha as detfecha from detalletarjeta where fecha=?) as detallet on detallet.detcontarjeta=tarjetas.contarjeta order by clientes.nombre ASC';
           }
           
           
           
            return $cordovaSQLite.execute(db, SQLvari, [fecha])
                    //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                    .then(
                            function (res) {
                               
                                var response = [];
                                if (res.rows.length > 0) {
                                    // alert(res.rows.length);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }
                                    
                                }
                                return response;
                                
                            },
                            function (error) {
                                console.log("Error on loading: " + error.message);
                                return false;
                                
                            }
                    );


        }
/////


        function __getCustomerListWhere(idcliente) {
            //  alert("ingreso getcustomerlist where");
            //var response = false;
            // Execute SELECT statement to load message from database.

            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

            //return $cordovaSQLite.execute(db, "SELECT * FROM clientes,tarjetas WHERE clientes.concliente=tarjetas.concliente AND (UPPER(clientes.nombre) LIKE UPPER(?) OR clientes.idcliente = ?)",["%"+idcliente+"%",idcliente])
            return $cordovaSQLite.execute(db, 'SELECT finalizada, contarjeta,detvalor,nombre, clientes.concliente FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join (select contarjeta as detcontarjeta, valor as detvalor, fecha as detfecha from detalletarjeta where fecha=?) as detallet on detallet.detcontarjeta=tarjetas.contarjeta where (UPPER(clientes.nombre) LIKE UPPER(?) OR clientes.idcliente = ?) order by nombre ASC', [fecha, "%" + idcliente + "%", idcliente])
                    .then(
                            function (res) {
                                // alert(res.rows.length);
                                var response = [];
                                if (res.rows.length > 0) {
                                    // alert(res.rows.length);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }

                                }
                                return response;
                            },
                            function (error) {
                                alert("Error on loading loans clientes" + error.message);
                            }
                    );


        }
/////
        function __getDetalleTarjeta(contarj) {
            // Execute SELECT statement to load message from database.
            return $cordovaSQLite.execute(db, "SELECT detalletarjeta.iddetalle, detalletarjeta.valor as detvalor, clientes.*, tarjetas.*, (tarjetas.valpagar-tarjetas.valpagado) as saldo, (tarjetas.valpagado/tarjetas.valcuota) as numcpagadas FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente left join detalletarjeta  on detalletarjeta.contarjeta=tarjetas.contarjeta  WHERE tarjetas.contarjeta =? ", [contarj])
                    .then(
                            function (res) {
                                var response = [];
                                if (res.rows.length > 0) {

                                    for (var i = 0; i < res.rows.length; i++) {

                                        response.push(res.rows.item(i));

                                    }

                                }
                                return response;
                            },
                            function (error) {
                                alert("Error on loading  loans det tarjeta: " + error.message);
                            }
                    );


        }


//// total cartera

        function __getCustomerLoans() {
            // alert("ingreso getcustomerlist");
            //var response = false;
            // Execute SELECT statement to load message from database.
            var currDate = new Date();
            var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

            return $cordovaSQLite.execute(db, 'SELECT sum(detvalor) as total_recaudo, count(clientes.concliente) as clientes_pago FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente inner join (select contarjeta as detcontarjeta, valor as detvalor, fecha as detfecha from detalletarjeta where fecha=?) as detallet on detallet.detcontarjeta=tarjetas.contarjeta ', [fecha])
                    //return $cordovaSQLite.execute(db, 'SELECT * FROM clientes inner join tarjetas on clientes.concliente=tarjetas.concliente ')
                    .then(
                            function (res) {
                                var response = [];
                                if (res.rows.length > 0) {
                                    // alert(res.rows.length);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        response.push(res.rows.item(i));
                                        //alert("Product ID: " +i+" "+ res.rows.item(i).nombre);
                                    }

                                }
                                return response;
                            },
                            function (error) {
                                alert("Error on loading: " + error.message);
                            }
                    );


        }
/////
        function __getCustomerListV2() {

            var listado = [];


            // Execute SELECT statement to load message from database.
            return $cordovaSQLite.execute(db, "select * FROM clientes")
                    .then(
                            function (resu) {
                                //listado=res.rows;
                                //$scope.listItems= [];

                                // alert(resu.rows.length);
                                for (var i = 0; i < resu.rows.length; i++) {
                                    //alert(resu.rows.item(i).nombre);
                                    //console.log("Product ID: " + res.rows.item(i).productID + " Product Name : " + res.rows.item(i).productName);

                                    //listado.push(resu.rows.item(i));
                                }

                            },
                            function (error) {
                                alert(error.message);
                                $scope.statusMessage = "Error on loading:  " + error.message;
                            }
                    );
            //alert(listado.length);
            //return listado;


        }
    }
})();
