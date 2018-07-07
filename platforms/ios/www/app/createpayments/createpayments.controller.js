/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CreatepaymentsCtrl', CreatepaymentsCtrl);

  CreatepaymentsCtrl.$inject = ['CreatepaymentsService','$state','session','$ionicHistory'];

  /**
   * @namespace LoansCtrl
   * @desc Loans Controller
   * @param {Object[]} Dependencies
   * @memberOf Loans.Controller
   */
  function CreatepaymentsCtrl(CreatepaymentsService,$state,session,$ionicHistory) {
    var vm = this;
    vm.customerList={};
    vm.cliente="";
    vm.calcularVrPagar= __calcularVrPagar;
    vm.calcularCuotas= __calcularCuotas;
    vm.calcularFFinal= __calcularFFinal;
    vm.guardarTarjeta= __guardarTarjeta;
    vm.verificarCliente=__verificarCliente;
    vm.salir= __salir;
    vm.data={};
    vm.maxPrestamo=10000000;
    vm.numerocuotas=72;
    //vm.data.cliente.nuevo='';

   // vm.formTarjeta= __formTarjeta;
    //vm.customerEdit=customerEdit;

    activate();

    function activate() {

      CreatepaymentsService.getCustomerList().then(

          function(resultado){
            //alert(JSON.stringify(resultado));
            vm.customerList=resultado;

                CreatepaymentsService.getNumTarjeta().then(

                  function(numT){

                      vm.numTarjeta=numT;
                      vm.currDate = new Date();

                      vm.fecha=vm.currDate.getFullYear() + '/' + ('0' + (vm.currDate.getMonth() + 1)).slice(-2) +'/' + ('0' + vm.currDate.getDate()).slice(-2);
                      vm.data.fecprestamo=vm.fecha;
                      vm.porcruta=sessionStorage.porcruta;
                      //vm.data.preespecial=false;
                      vm.data.numerotarjeta=vm.numTarjeta;

                      //alert(sessionStorage.prestamoMaximo);

                  }
                )


          }

      )
      //vm.paymentsList = CreatepaymentsService.getPaymentsList();
      //alert(vm.paymentsList);
    }

    function __verificarCliente(){

        if(!vm.data.cliente.concliente && vm.data.cliente!=''){
            alert('Debe seleccionar un cliente de la lista');
            vm.data.cliente="";
        }
        else{
        if(vm.data.cliente.nuevo==1){
          vm.maxPrestamo=sessionStorage.prestamoMaximo;
          vm.numerocuotas=sessionStorage.cuotasRuta;
        }
        
    }


    }
    function __calcularVrPagar(){


        vm.data.valpagar=((parseFloat(vm.data.valprestamo)*parseFloat(sessionStorage.porcruta)/100)+parseFloat(vm.data.valprestamo));
        __calcularCuotas();

    }

    function __salir(){



         $ionicHistory.clearCache().then(function(){$state.go('tab.payments');});

    }

    function __calcularCuotas(){

        vm.data.valcuota=parseFloat(vm.data.valpagar)/parseFloat(vm.data.numcuotas);
        vm.data.fecfinal=vm.fecha;
        vm.fechafinal= new Date();
        vm.fechafinal.setDate(vm.currDate.getDate() + parseFloat(vm.data.numcuotas));
         vm.data.fecfinal=vm.fechafinal.getFullYear() + '/' + ('0' + (vm.fechafinal.getMonth() + 1)).slice(-2) +'/' + ('0' + vm.fechafinal.getDate()).slice(-2);


              __calcularFFinal();

    }

    function __calcularFFinal(){

         CreatepaymentsService.getFestivos().then(

              function(festivos){

                  var fechaA= new Date();
var FIinicial=new Date();
                for(var i=0;i<festivos.length;i++){
                  var fechaV= new Date(festivos[i].anio+"-"+festivos[i].mes+"-"+festivos[i].dia);
                  
                  //FIinicial=vm.currDate;
                    console.log("fecha inicial"+FIinicial);
                   // alert(vm.fechafinal.getFullYear() + '/' + ('0' + (vm.fechafinal.getMonth() + 1)).slice(-2) +'/' + ('0' + vm.fechafinal.getDate()).slice(-2))

                  if(fechaV>=FIinicial && fechaV<=vm.fechafinal){

                       vm.fechafinal.setDate(vm.fechafinal.getDate() + 1);
                  }

                }

                vm.data.fecfinal=vm.fechafinal.getFullYear() + '/' + ('0' + (vm.fechafinal.getMonth() + 1)).slice(-2) +'/' + ('0' + vm.fechafinal.getDate()).slice(-2);
                vm.data.fecprestamo=FIinicial.getFullYear() + '/' + ('0' + (FIinicial.getMonth() + 1)).slice(-2) +'/' + ('0' + FIinicial.getDate()).slice(-2);
                vm.data.numerotarjeta=vm.numTarjeta;
              }
        )


    }

    function __guardarTarjeta() {
      //alert("idconceptoegreso=>"+vm.data.idconceptoegreso.idconceptoegreso);

      CreatepaymentsService.InsertTarjeta(vm.data).then(
          function (respuesta){
            if(respuesta==true){
              alert("Se registro la tarjeta correctamente");
              
              $ionicHistory.clearCache().then(function(){$state.go('tab.payments');});

            }
          }
      )
    }


  }
})();
