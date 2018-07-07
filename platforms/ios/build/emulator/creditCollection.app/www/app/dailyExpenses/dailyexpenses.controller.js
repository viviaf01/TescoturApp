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

  DailyExpensesCtrl.$inject = ['DailyExpensesService','$state','$ionicHistory'];

  /**
   * @namespace DailyExpensesCtrl
   * @desc dailyExpenses Controller
   * @param {Object[]} Dependencies
   * @memberOf dailyexpenses.Controller
   */
  function DailyExpensesCtrl(DailyExpensesService,$state,$ionicHistory) {
    var vm = this;
    vm.gastosList={};
    vm.expensesTypeList={};
    vm.guardarGasto = __guardarGasto;
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
      DailyExpensesService.getExpensesType().then(function(responseET){

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
        });


    }



    function __guardarGasto() {
      //alert("idconceptoegreso=>"+vm.data.idconceptoegreso.idconceptoegreso);

      DailyExpensesService.ExistExpense(vm.data).then(
        function(existe){
            if(existe==true){
                DailyExpensesService.DelExpense(vm.data).them(
                  function(elimino){
                      if(elimino==true){
                          DailyExpensesService.InsertExpense(vm.data).then(
                            function(data){
                              //alert(data);
                              if(data==true){
                                vm.data={};
                                alert('Se registro el gasto correctamente');
                                __consultarGasto();
                              }
                            }
                          );
                      }
                  }
                );
            }
            else{

              DailyExpensesService.InsertExpense(vm.data).then(
                            function(data){
                              //alert(data);
                              if(data==true){
                                vm.data={};

                                alert('Se registro el gasto correctamente');
                                __consultarGasto();
                              }
                            }
                          );

            }
        }
      );




    }

    function __consultarGasto() {
      //alert("idconceptoegreso=>"+vm.data.idconceptoegreso.idconceptoegreso);
      DailyExpensesService.getGastosList().then(function(responseEgreso){
                          vm.gastosList={};
                          vm.gastosList=responseEgreso;
                      });


    }

    function __verificarTipoGasto(){

        
      if(!vm.data.idconceptoegreso.idconceptoegreso){
          vm.data.idconceptoegreso="";
          alert('Debe seleccionar un concepto de egreso de la lista');
      }else{
        if(vm.data.idconceptoegreso.valor>0){
          vm.data.valor=vm.data.idconceptoegreso.valor;
          vm.valReq=true;
        }else{
          vm.valReq=false;

        }
        if(vm.data.idconceptoegreso.reqobser===1){

            vm.reqObs=true;

        }else{
          vm.reqObs=false;
        }
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
