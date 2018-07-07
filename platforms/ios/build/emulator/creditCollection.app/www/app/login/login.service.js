/**
 * login Service
 * @namespace loginservice
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .service('LoginService', function ($q, $cordovaSQLite, session) {
                return {
                    validateCredentials: __validateCredentials,
                    SaveLogLogin: __saveLogLogin,
                    validateLogDay: __validateLogDay,
                    copiaTarjetas: __copiaTarjetas,
                    copiaClientes: __copiaClientes,
                    copiaDetalleTarjetas: __copiaDetalleTarjetas,
                    copiaEgreso: __copiaEgreso,
                    existeCliente: __existeCliente

                }

                function __validateCredentials(data) {
                    return areCredentialsOk(data).then(function (rs) {
                        return rs;
                    });
                }
                function __validateLogDay() {
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);
                    var response = false;
                    return $cordovaSQLite.execute(db, 'SELECT * FROM logUsuario WHERE conusuario =? AND fecha =?', [sessionStorage.userId, fecha])
                            .then(
                                    function (res) {
                                        //alert(res.rows.length);
                                        if (res.rows.length > 0) {

                                            response = true;
                                        }
                                        return response;
                                    },
                                    function (error) {
                                        alert("Error on loading: " + error.message);
                                    }
                            );


                }

                function __saveLogLogin() {

                    var response = false;
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

                    return $cordovaSQLite.execute(db, "insert into logUsuario (conusuario,fecha,conteo) values(?,?,?)", [sessionStorage.userId, fecha, 1]).then(function (result) {

                        return true;
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        return false;
                    });

                }

                function areCredentialsOk(data) {
                    var response = false;
                    // Execute SELECT statement to load message from database.
                    return $cordovaSQLite.execute(db, 'SELECT * FROM usuarios WHERE usuario =? AND contrasena =? AND estado = ?', [data.username, data.password, 'activo'])
                            .then(
                                    function (res) {
                                        if (res.rows.length > 0) {
                                            for (var i = 0; i < res.rows.length; i++) {


                                                sessionStorage.userId = res.rows.item(i).conusuario;
                                                sessionStorage.name = res.rows.item(i).nombre;
                                                sessionStorage.rol = res.rows.item(i).privilegio;
                                                //alert(sessionStorage.userId);

                                            }


                                            response = true;
                                        }
                                        return response;
                                    },
                                    function (error) {
                                        alert("Error on loading: " + error.message);
                                    }
                            );


                }


                /// servicios de cambio de dìa

                function __copiaTarjetas() {
                    
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

                    $cordovaSQLite.execute(db_bck, 'CREATE TABLE IF NOT EXISTS tarjetas (idtarjeta INTEGER PRIMARY KEY AUTOINCREMENT, contarjeta INTEGER , numtarjeta INTEGER , anyo INTEGER, valprestamo TEXT, valpagar TEXT, preespcial INTEGER, valcuota TEXT, numcuotas INTEGER, fecprestamo TEXT, fecinicio  TEXT, fecfinal TEXT, finalizada INTEGER, fecultpago TEXT, ordenruta INTEGER, concliente INTEGER, frecpago TEXT, valpagado INTEGER, nueva integer, fechacopia text)');

                    return $cordovaSQLite.execute(db, "SELECT * FROM tarjetas ").then(function (res) {

                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {

                                $cordovaSQLite.execute(db_bck, 'insert into tarjetas (contarjeta, numtarjeta , anyo, valprestamo, valpagar, preespcial, valcuota, numcuotas, fecprestamo, fecinicio, fecfinal, finalizada, fecultpago, ordenruta, concliente, frecpago, valpagado, nueva, fechacopia) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                        [res.rows.item(i).contarjeta, res.rows.item(i).numtarjeta, res.rows.item(i).anyo, res.rows.item(i).valprestamo, res.rows.item(i).valpagar, res.rows.item(i).preespcial, res.rows.item(i).valcuota, res.rows.item(i).numcuotas, res.rows.item(i).fecprestamo, res.rows.item(i).fecinicio, res.rows.item(i).fecfinal, res.rows.item(i).finalizada, res.rows.item(i).fecultpago, res.rows.item(i).ordenruta, res.rows.item(i).concliente, res.rows.item(i).frecpago, res.rows.item(i).valpagado, res.rows.item(i).nueva, fecha]);
                            }

                            $cordovaSQLite.execute(db, 'drop table tarjetas');
                            
                        }
                        return true;
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        return false;
                    });

                }

                function __copiaClientes() {

                    
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

                    $cordovaSQLite.execute(db_bck, 'CREATE TABLE IF NOT EXISTS clientes (idcliente INTEGER PRIMARY KEY AUTOINCREMENT, concliente INTEGER , idcliente INTEGER , nombre TEXT, ocupacion TEXT, dir INTEGER, numtelefono TEXT, idruta INTEGER, nuevo INTEGER, fechacopia text)');

                    return $cordovaSQLite.execute(db, "SELECT * FROM clientes ").then(function (res) {

                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {

                                $cordovaSQLite.execute(db_bck, 'insert into clientes (concliente , idcliente , nombre, ocupacion, dir, numtelefono, idruta, nuevo, fechacopia) values (?,?,?,?,?,?,?,?,?)',
                                        [res.rows.item(i).concliente, res.rows.item(i).idcliente, res.rows.item(i).nombre, res.rows.item(i).ocupacion, res.rows.item(i).dir, res.rows.item(i).numtelefono, res.rows.item(i).idruta, res.rows.item(i).nuevo, fecha]);
                            }

                             $cordovaSQLite.execute(db, 'drop table clientes');
                        }
                        return true;
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        return false;
                    });

                }

                function __copiaDetalleTarjetas() {

                    
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

                    $cordovaSQLite.execute(db_bck, 'CREATE TABLE IF NOT EXISTS detalletarjeta (iddettarjeta INTEGER PRIMARY KEY AUTOINCREMENT, iddetalle INTEGER , contarjeta INTEGER ,  valor INTEGER, fecha TEXT, hora TEXT, fechacopia text)');

                    return $cordovaSQLite.execute(db, "SELECT * FROM detalletarjeta ").then(function (res) {

                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {

                                $cordovaSQLite.execute(db_bck, 'insert into detalletarjeta (iddetalle , contarjeta ,  valor, fecha, hora, fechacopia) values (?,?,?,?,?,?)',
                                        [res.rows.item(i).iddetalle, res.rows.item(i).contarjeta, res.rows.item(i).valor, res.rows.item(i).fecha, res.rows.item(i).hora, fecha]);
                            }

                            $cordovaSQLite.execute(db, 'drop table detalletarjeta');
                        }
                        return true;
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        return false;
                    });

                }

                function __copiaEgreso() {

                   
                    var currDate = new Date();
                    var fecha = currDate.getFullYear() + '/' + ('0' + (currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + currDate.getDate()).slice(-2);

                    $cordovaSQLite.execute(db_bck, 'CREATE TABLE IF NOT EXISTS egreso (idcegreso INTEGER PRIMARY KEY AUTOINCREMENT, idegreso INTEGER, valor INTEGER , fecha TEXT, idconceptoegreso INTEGER, observaciones TEXT, idruta INTEGER, fechacopia text)');

                    return $cordovaSQLite.execute(db, "SELECT * FROM egreso ").then(function (res) {

                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {

                                $cordovaSQLite.execute(db_bck, 'insert into egreso (idegreso, valor, fecha, idconceptoegreso, observaciones, idruta, fechacopia) values (?,?,?,?,?,?,?)',
                                        [res.rows.item(i).idegreso, res.rows.item(i).valor, res.rows.item(i).fecha, res.rows.item(i).idconceptoegreso, res.rows.item(i).observaciones, res.rows.item(i).idruta, fecha]);
                            }

                            $cordovaSQLite.execute(db, 'drop table egreso');
                            $cordovaSQLite.execute(db, 'drop table conceptoegreso');
                            
                        }
                        return true;
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        return false;
                    });

                }

                function __existeCliente() {
                    var response = false;
                    return $cordovaSQLite.execute(db, "SELECT count(concliente) as total FROM clientes ").then(function (result) {

                        
                        if (result.rows.item(0).total > 0) {
                            response = true;
                        }

                        return response;
                        //alert("Message saved successful, cheers!" + data.response[i].nombre);
                    }, function (error) {
                        
                        return false;
                    });
                }
            })
})();
