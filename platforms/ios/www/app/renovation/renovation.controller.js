/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
    'use strict';

    angular
            .module('app')
            .controller('RenovationCtrl', RenovationCtrl);

    RenovationCtrl.$inject = ['RenovationService', 'GenericService', '$state', 'session', '$window','$ionicHistory'];

    /**
     * @namespace RenovationCtrl
     * @desc Renovation Controller
     * @param {Object[]} Dependencies
     * @memberOf Renovation.Controller
     */
    function RenovationCtrl(RenovationService, GenericService, $state, session, $window,$ionicHistory) {
        var vm = this;
        vm.dettarj = {};

        //vm.customerList={};
        //vm.cliente="";
        vm.calcularVrPagar = __calcularVrPagar;
        vm.calcularCuotas = __calcularCuotas;
        vm.calcularFFinal = __calcularFFinal;
        vm.guardarTarjeta = __guardarTarjeta;
        vm.verificarCliente = __verificarCliente;
        vm.salir = __salir;

        vm.data = {};
        vm.maxPrestamo = 10000000;
        vm.numerocuotas = 72;

        vm.valpagar = 0;
        vm.preespecial = false;
        vm.valcuota = 0;
        vm.fecfinal = "";

        // vm.formTarjeta= __formTarjeta;
        //vm.customerEdit=customerEdit;

        activate();

        function activate() {
            //alert(GenericService.getData());


            RenovationService.getNumTarjeta().then(
                    function (numT) {
                        vm.dettarj = GenericService.getData();
                        //console.log("en renovation"+JSON.stringify(vm.dettarj));
                        vm.dettarj[0].valprestamo = parseInt(vm.dettarj[0].valprestamo);
                        vm.dettarj[0].numcuotas = parseInt(vm.dettarj[0].numcuotas);
                        vm.numTarjeta = numT;
                        vm.currDate = new Date();

                        vm.fecha = vm.currDate.getFullYear() + '/' + ('0' + (vm.currDate.getMonth() + 1)).slice(-2) + '/' + ('0' + vm.currDate.getDate()).slice(-2);
                        vm.data.fecprestamo = vm.fecha;
                        vm.porcruta = sessionStorage.porcruta;
                        // vm.data.preespecial=true;
                        vm.data.numerotarjeta = vm.numTarjeta;
                        vm.data.concliente = vm.dettarj[0].concliente;
                        vm.data.cliente = vm.dettarj[0].nombre;
                        vm.data.valprestamo = vm.dettarj[0].valprestamo;
                        vm.data.numcuotas = vm.dettarj[0].numcuotas;

                        /// calcular vr a pagar
                        vm.valpagar = ((parseInt(vm.dettarj[0].valprestamo) * parseInt(sessionStorage.porcruta) / 100) + parseInt(vm.dettarj[0].valprestamo));

                        //console.log(vm.valpagar);
                        /// calcular cuotas
                        vm.data.valcuota = parseFloat(vm.valpagar) / parseFloat(vm.dettarj[0].numcuotas);
                        vm.data.fecfinal = vm.fecha;
                        vm.data.valpagar = vm.valpagar;
                        vm.fechafinal = new Date();
                        vm.fechafinal.setDate(vm.currDate.getDate() + parseFloat(vm.dettarj[0].numcuotas));
                        vm.fecfinal = vm.fechafinal.getFullYear() + '/' + ('0' + (vm.fechafinal.getMonth() + 1)).slice(-2) + '/' + ('0' + vm.fechafinal.getDate()).slice(-2);

                        __calcularFFinal();

                    }
            );



        }

        function __verificarCliente() {

            if (vm.data.cliente.nuevo == 1) {
                vm.maxPrestamo = sessionStorage.prestamoMaximo;
                vm.numerocuotas = sessionStorage.cuotasRuta;
            }


        }
        function __calcularVrPagar() {

            vm.data.valpagar = ((parseFloat(vm.data.valprestamo) * parseFloat(sessionStorage.porcruta) / 100) + parseFloat(vm.data.valprestamo));
            //vm.data.preespecial=true;
            //  alert("valpagar "+vm.data.valpagar);
            __calcularCuotas();

        }

        function __salir() {


            $state.go('tab.loan');

        }

        function __calcularCuotas() {

            vm.data.valcuota = parseFloat(vm.data.valpagar) / parseFloat(vm.data.numcuotas);
            vm.data.fecfinal = vm.fecha;
            vm.fechafinal = new Date();
            vm.fechafinal.setDate(vm.currDate.getDate() + parseFloat(vm.data.numcuotas));
            vm.data.fecfinal = vm.fechafinal.getFullYear() + '/' + ('0' + (vm.fechafinal.getMonth() + 1)).slice(-2) + '/' + ('0' + vm.fechafinal.getDate()).slice(-2);


            __calcularFFinal();

        }

        function __calcularFFinal() {

            RenovationService.getFestivos().then(
                    function (festivos) {

                        var fechaA = new Date();
                        var FIinicial = new Date();
                        for (var i = 0; i < festivos.length; i++) {
                            var fechaV = new Date(festivos[i].anio + "-" + festivos[i].mes + "-" + festivos[i].dia);

                            FIinicial = vm.currDate;

                            // console.log(FIinicial)

                            if (fechaV >= FIinicial && fechaV <= vm.fechafinal) {

                                vm.fechafinal.setDate(vm.fechafinal.getDate() + 1);
                            }

                        }

                        vm.data.fecfinal = vm.fechafinal.getFullYear() + '/' + ('0' + (vm.fechafinal.getMonth() + 1)).slice(-2) + '/' + ('0' + vm.fechafinal.getDate()).slice(-2);
                        vm.data.fecprestamo = FIinicial.getFullYear() + '/' + ('0' + (FIinicial.getMonth() + 1)).slice(-2) + '/' + ('0' + FIinicial.getDate()).slice(-2);
                        vm.data.numerotarjeta = vm.numTarjeta;
                    }
            )


        }

        function __guardarTarjeta() {
            //alert("idconceptoegreso=>"+vm.data.idconceptoegreso.idconceptoegreso);

            RenovationService.InsertTarjeta(vm.data).then(
                    function (respuesta) {
                        if (respuesta == true) {
                            alert("Se registro la tarjeta correctamente");
                            $ionicHistory.clearCache().then(function () {
                                $state.go('tab.loan');
                            });
                        }
                    }
            )
        }


    }
})();
