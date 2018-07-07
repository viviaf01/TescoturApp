/**
 * Loans Controller
 * @namespace Loans
 * @memberOf Controllers
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('DailyExpensesCtrl', DailyExpensesCtrl);

  DailyExpensesCtrl.$inject = ['DailyExpensesService','ApiCoordinadoresService','ApiMensajesService','$state','$ionicHistory','$ionicLoading','session'];

  /**
   * @namespace DailyExpensesCtrl
   * @desc dailyExpenses Controller
   * @param {Object[]} Dependencies
   * @memberOf dailyexpenses.Controller
   */
  function DailyExpensesCtrl(DailyExpensesService,ApiCoordinadoresService,ApiMensajesService,$state,$ionicHistory,$ionicLoading,session) {
    var vm = this;
    vm.gastosList=[];
    vm.expensesTypeList=[];
    vm.enviarMensaje = __enviarMensaje;
    vm.consultarGasto=__consultarGasto;
    vm.data={};
    vm.eliminarGasto=__eliminarGasto;
    vm.verificarTipoGasto= __verificarTipoGasto;
    vm.askEliminarGasto= __askEliminarGasto;
    vm.reqObs=false;
    vm.valReq=false;

    //vm.customerEdit=customerEdit;

    activate();

    function activate() {
      //  alert("entro activate");
      
      ApiCoordinadoresService.get().then(
              
              
              function(coord){
              ApiMensajesService.get(sessionStorage.userId).then(
                      function(mensajes){
                            for(var i=0;i<coord.length;i++){
                                vm.expensesTypeList.push(coord[i]); 
                            }
                            for(var j=0;j<mensajes.length;j++){
                                vm.gastosList.push(mensajes[j]);
                            }
                           
                             
                             console.log(vm.expensesTypeList);
                                 }
                )    
                  
              });
      /*DailyExpensesService.getExpensesType().then(function(responseET){

                //console.log(responseET);
                    

                     DailyExpensesService.getGastosList().then(function(responseEgreso){
                         
                         if(responseEgreso===false){
                            alert('Debe descargar datos');
                            $ionicHistory.clearCache().then(function () {
                                                $state.go('tab.sync');
                                               
                                            });
                        
                            
                         }else{
                            vm.expensesTypeList=responseET;
                            vm.gastosList=responseEgreso;
                            }
                      });
        });*/


    }



    function __enviarMensaje() {
      //alert("idconceptoegreso=>"+vm.data.idconceptoegreso.idconceptoegreso);
      $ionicLoading.show();

      var respuesta=DailyExpensesService.enviarMensaje(vm.data,sessionStorage.userID);
      console.log(vm.data);
      console.log(sessionStorage.userID);
      $ionicLoading.hide();


    }

    function __consultarGasto() {
      //alert("idconceptoegreso=>"+vm.data.idconceptoegreso.idconceptoegreso);
      DailyExpensesService.getGastosList().then(function(responseEgreso){
                          vm.gastosList={};
                          vm.gastosList=responseEgreso;
                      });


    }

    function __verificarTipoGasto(){

        console.log(vm.data);
      if(!vm.data.idconceptoegreso.us_id){
          vm.data.idconceptoegreso="";
          alert('Debe seleccionar un destinatario de la lista');
      }else{
        
            vm.reqObs=true;

        
    }




    }
    
    function __askEliminarGasto(idegreso){
        
        if(confirm('¿Desea eliminar el gasto?')==true){
         
         __eliminarGasto(idegreso);
            
        }
    }

    function __eliminarGasto(idegreso){

      DailyExpensesService.DeleteExpenseID(idegreso).then(

        function(respuesta){

          if(respuesta==true){
            vm.data={};

            alert('Se elimino el gasto correctamente');
             __consultarGasto();
          }


        }
      )
    }
  }
})();
