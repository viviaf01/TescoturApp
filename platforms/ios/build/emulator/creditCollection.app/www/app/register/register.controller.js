/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['RegisterService', 'GenericService', '$state', '$window', '$ionicHistory','$ionicScrollDelegate'];

    /**
     * @namespace LoansCtrl
     * @desc Loans Controller
     * @param {Object[]} Dependencies
     * @memberOf Loans.Controller
     */
    function RegisterCtrl(RegisterService, GenericService, $state, $window, $ionicHistory,$ionicScrollDelegate) {
        var vm = this;
        vm.dettarj = {};
        vm.vrpagado = 0;
        vm.scPosition=0;

        vm.ncuotas = [];
        vm.nfilas = [];

        vm.ncolumnas = [];

        vm.nCPagas = 0;
        vm.data = [];
        vm.detpago = true;
        vm.ultimasCPagas = 0;
        vm.cuotaUltimaPaga = 0;
        vm.valorCuota = 0;
        vm.vr_tiene=0;

        vm.guardarPago = __guardarPago;
        vm.cargarDetalle = __cargarDetalle;
        vm.eliminarPago = __eliminarPago;
        vm.guardarPagoAuto = __guardarPagoAuto;
        vm.askEliminarPago = __askEliminarPago;
        vm.askGuardarPagoAuto = __askGuardarPagoAuto;

        activate();

        function activate() {
            vm.dettarj = GenericService.getData();
            
            
            vm.nCPagas = Math.floor(vm.dettarj[0].numcpagadas);
            vm.ultimasCPagas = Math.floor(vm.dettarj[0].detvalor / vm.dettarj[0].valcuota);
            vm.scPosition=vm.dettarj[0].contarjeta;
            vm.cuotaUltimaPaga = vm.nCPagas - vm.ultimasCPagas;
            
            vm.valorCuota = vm.dettarj[0].valcuota;
            vm.data.contarjeta = vm.dettarj[0].contarjeta;
            vm.data.valpagado = vm.dettarj[0].valpagado;
            vm.vr_tiene=Math.round(vm.dettarj[0].valpagado-(vm.nCPagas*vm.dettarj[0].valcuota));
            
            //alert(vm.dettarj[0].iddetalle);
            if (vm.dettarj[0].iddetalle > 0) {
                vm.detpago = false;
            } else {
                vm.detpago = true;
            }
            var xDimensions = Math.ceil(vm.dettarj[0].numcuotas / 24);  ///30 =2 cuadriculas
            var yDimensions = 4; ///numero de columnas

            var contcuota = 1;
            var cont = 1;
            var next = 0;
            var valor = 0;

            for (var cLoop = 0; cLoop < xDimensions; cLoop++) { /// 2 cuadriculas
                vm.ncuotas[cLoop] = [];

                for (var xLoop = 1; xLoop <= 6; xLoop++) {
                    vm.ncuotas[cLoop][xLoop] = [];

                    for (var yLoop = 1; yLoop <= 4; yLoop++) {

                        if (yLoop == 1) {
                            if ((xLoop + (cLoop * 24)) <= vm.dettarj[0].numcuotas) {
                                valor = (xLoop + (cLoop * 24));
                            } else {
                                valor = 0;
                            }

                            vm.ncuotas[cLoop][xLoop][yLoop - 1] = valor;
                            next = xLoop + (cLoop * 24) + 6;

                        } else {
                            if ((next) <= vm.dettarj[0].numcuotas) {
                                valor = next;
                            } else {
                                valor = 0;
                            }

                            vm.ncuotas[cLoop][xLoop][yLoop - 1] = valor;
                            next = next + 6;
                        }


                        cont++;
                        contcuota++;
                    }
                }
            }



        }

        function __askEliminarPago() {

            if (confirm('¿Desea eliminar el pago?') == true) {

                __eliminarPago();

            }
        }

        function __eliminarPago() {
            RegisterService.updateTarjetaEliminar(vm.data).then(
                    function (actualiza) {
                        if (actualiza == true) {
                            /////
                            RegisterService.DeletePayment(vm.data).then(
                                    function (elimino) {
                                        if (elimino == true) {
                                            alert("Ultimo pago eliminado");

                                            GenericService.setValor(vm.scPosition);
                                            $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.loan');
                                            });
                                        }
                                    }
                            );
                        }
                    }
            );

        }

        function __cargarDetalle(cTarjeta) {

            RegisterService.getDetalleTarjeta(cTarjeta).then(
                    function (detalle) {
                        vm.dettarj = detalle;
//register.data.vrpagado
                        vm.nCPagas = vm.dettarj[0].numcpagadas;
                        vm.data.contarjeta = vm.dettarj[0].contarjeta;
                        vm.data.valpagado = vm.dettarj[0].valpagado;
                        if (vm.dettarj[0].iddetalle > 0) {
                            vm.detpago = false;
                        } else {
                            vm.detpago = true;
                        }


                        var xDimensions = Math.ceil(vm.dettarj[0].numcuotas / 24);  ///30 =2 cuadriculas
                        var yDimensions = 4; ///numero de columnas

                        var contcuota = 1;
                        var cont = 1;
                        var next = 0;
                        var valor = 0;

                        for (var cLoop = 0; cLoop < xDimensions; cLoop++) { /// 2 cuadriculas
                            vm.ncuotas[cLoop] = [];

                            for (var xLoop = 1; xLoop <= 6; xLoop++) {
                                vm.ncuotas[cLoop][xLoop] = [];

                                for (var yLoop = 1; yLoop <= 4; yLoop++) {

                                    if (yLoop == 1) {
                                        if ((xLoop + (cLoop * 24)) <= vm.dettarj[0].numcuotas) {
                                            valor = (xLoop + (cLoop * 24));
                                        } else {
                                            valor = 0;
                                        }

                                        vm.ncuotas[cLoop][xLoop][yLoop - 1] = valor;
                                        next = xLoop + (cLoop * 24) + 6;

                                    } else {
                                        if ((next) <= vm.dettarj[0].numcuotas) {
                                            valor = next;
                                        } else {
                                            valor = 0;
                                        }

                                        vm.ncuotas[cLoop][xLoop][yLoop - 1] = valor;
                                        next = next + 6;
                                    }


                                    cont++;
                                    contcuota++;
                                }
                            }
                        }
                    }

            )


        }

///metodo
        function __askGuardarPagoAuto(contarjeta, numcuota, estado) {

            if (estado != 'payed') {
                if (vm.ultimasCPagas > 0 && numcuota > 0) {
                    alert('Debe eliminar el pago antes de ingresar uno nuevo');

                } else {

                    if (numcuota > vm.nCPagas && numcuota > 0) {
                        if (confirm('¿Desea guardar el pago hasta la cuota ' + numcuota+' ?') == true) {
                            vm.data.vrpagado = Math.round(((numcuota - vm.nCPagas) * vm.valorCuota)-vm.vr_tiene);
                            __guardarPagoAuto(contarjeta);
                        }
                    }


                }
            }

        }
        function __guardarPagoAuto(contarjeta) {

            RegisterService.ConsultarTarjetaPA(contarjeta).then(
                    function (valcuota) {
                        //vm.data.vrpagado=valcuota;


                        RegisterService.ExistPayment(vm.data).then(
                                function (existe) {

                                    if (existe == true) {

                                        RegisterService.updateTarjetaEliminar(vm.data).then(
                                                function (actualiza) {
                                                    if (actualiza == true) {
                                                        /////
                                                        RegisterService.DeletePayment(vm.data).then(
                                                                function (elimino) {
                                                                    if (elimino == true) {
                                                                        RegisterService.InsertPayment(vm.data).then(
                                                                                function (registrado) {
                                                                                    if (registrado == true) {
                                                                                        RegisterService.updateTarjetaInsercion(vm.data).then(
                                                                                                function (actualizado) {
                                                                                                    if (actualizado == true) {
                                                                                                        RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                                                                function (verificado) {

                                                                                                                    if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                                                                        RegisterService.finalizarTarjeta(vm.data).then(
                                                                                                                                function (finalizado) {
                                                                                                                                    if (finalizado == true) {
                                                                                                                                        alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                                                                        //__cargarDetalle(vm.data.contarjeta);
                                                                                                                                        GenericService.setValor(vm.scPosition);
                                                                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                                                                            $state.go('tab.loan');
                                                                                                                                        });


                                                                                                                                    }
                                                                                                                                }
                                                                                                                        );



                                                                                                                    } else {

                                                                                                                        alert("Se registro el pago correctamente");
                                                                                                                        // __cargarDetalle(vm.data.contarjeta);
                                                                                                                        GenericService.setValor(vm.scPosition);
                                                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                                                            $state.go('tab.loan');
                                                                                                                        });

                                                                                                                    }
                                                                                                                }
                                                                                                        );

                                                                                                    }
                                                                                                }
                                                                                        )
                                                                                    }
                                                                                }
                                                                        )
                                                                    }
                                                                }
                                                        )
                                                        ////
                                                    }
                                                })

                                    } else {

                                        RegisterService.InsertPayment(vm.data).then(
                                                function (registrado) {
                                                    if (registrado == true) {
                                                        RegisterService.updateTarjetaInsercion(vm.data).then(
                                                                function (actualizado) {
                                                                    if (actualizado == true) {
                                                                        RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                                function (verificado) {
                                                                                    if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                                        RegisterService.finalizarTarjeta(vm.data).then(
                                                                                                function (finalizado) {
                                                                                                    if (finalizado == true) {
                                                                                                        alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                                        //__cargarDetalle(vm.data.contarjeta);
                                                                                                        GenericService.setValor(vm.scPosition);
                                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                                            $state.go('tab.loan');
                                                                                                            
                                                                                                        });

                                                                                                    }
                                                                                                }
                                                                                        );



                                                                                    } else {

                                                                                        alert("Se registro el pago correctamente");
                                                                                        // __cargarDetalle(vm.data.contarjeta);
                                                                                        GenericService.setValor(vm.scPosition);
                                                                                        $ionicHistory.clearCache().then(function () {
                                                                                            $state.go('tab.loan');
                                                                                        });

                                                                                    }
                                                                                }
                                                                        );


                                                                    }
                                                                }
                                                        )

                                                    }
                                                }
                                        )

                                    }
                                }

                        )
                    }
            );

        }

        function __guardarPago() {

            RegisterService.ExistPayment(vm.data).then(
                    function (existe) {

                        if (existe == true) {

                            RegisterService.updateTarjetaEliminar(vm.data).then(
                                    function (actualiza) {
                                        if (actualiza == true) {
                                            /////
                                            RegisterService.DeletePayment(vm.data).then(
                                                    function (elimino) {
                                                        if (elimino == true) {
                                                            RegisterService.InsertPayment(vm.data).then(
                                                                    function (registrado) {
                                                                        if (registrado == true) {
                                                                            RegisterService.updateTarjetaInsercion(vm.data).then(
                                                                                    function (actualizado) {
                                                                                        if (actualizado == true) {
                                                                                            RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                                                    function (verificado) {

                                                                                                        if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                                                            RegisterService.finalizarTarjeta(vm.data).then(
                                                                                                                    function (finalizado) {
                                                                                                                        if (finalizado == true) {
                                                                                                                            alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                                                                            GenericService.setValor(vm.scPosition);
                                                                                                                            $ionicHistory.clearCache().then(function () {
                                                                                                                                $state.go('tab.loan');
                                                                                                                            });

                                                                                                                        }
                                                                                                                    }
                                                                                                            );



                                                                                                        } else {

                                                                                                            alert("Se registro el pago correctamente");
                                                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                                                            GenericService.setValor(vm.scPosition);
                                                                                                            $ionicHistory.clearCache().then(function () {
                                                                                                                $state.go('tab.loan');
                                                                                                            });

                                                                                                        }
                                                                                                    }
                                                                                            );

                                                                                        }
                                                                                    }
                                                                            )
                                                                        }
                                                                    }
                                                            )
                                                        }
                                                    }
                                            )
                                            ////
                                        }
                                    })

                        } else {

                            RegisterService.InsertPayment(vm.data).then(
                                    function (registrado) {
                                        if (registrado == true) {
                                            RegisterService.updateTarjetaInsercion(vm.data).then(
                                                    function (actualizado) {
                                                        if (actualizado == true) {
                                                            RegisterService.VerFinalizarTarjeta(vm.data).then(
                                                                    function (verificado) {
                                                                        if (verificado[0].valpagado == verificado[0].valpagar) {
                                                                            RegisterService.finalizarTarjeta(vm.data).then(
                                                                                    function (finalizado) {
                                                                                        if (finalizado == true) {
                                                                                            alert("Se registro el pago correctamente, la tarjeta a finalizado");
                                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                                            GenericService.setValor(vm.scPosition);
                                                                                            $ionicHistory.clearCache().then(function () {
                                                                                                $state.go('tab.loan');
                                                                                            });

                                                                                        }
                                                                                    }
                                                                            );



                                                                        } else {

                                                                            alert("Se registro el pago correctamente");
                                                                            //__cargarDetalle(vm.data.contarjeta);
                                                                            GenericService.setValor(vm.scPosition);
                                                                            $ionicHistory.clearCache().then(function () {
                                                                                $state.go('tab.loan');
                                                                            });

                                                                        }
                                                                    }
                                                            );


                                                        }
                                                    }
                                            )

                                        }
                                    }
                            )

                        }
                    }

            )

        }



        ///// fin pago automatico
    }
})();
